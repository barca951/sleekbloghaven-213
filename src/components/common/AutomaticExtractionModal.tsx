import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Upload, 
  Download, 
  Zap, 
  Eye, 
  Save, 
  Settings, 
  CheckCircle,
  Loader2,
  FileImage,
  Link
} from 'lucide-react';

interface ExtractedData {
  title: string;
  type: string;
  content: string;
  reference: string;
  date: string;
  author: string;
  sector: string;
  keywords: string[];
  confidence: number;
  // Champs spécifiques aux procédures
  steps?: string[];
  deadline?: string;
  documents?: string[];
}

interface AutomaticExtractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: 'legal' | 'procedure';
  onDataExtracted?: (data: ExtractedData) => void;
}

export function AutomaticExtractionModal({ 
  isOpen, 
  onClose, 
  context,
  onDataExtracted 
}: AutomaticExtractionModalProps) {
  console.log('🎭 [AutomaticExtractionModal] PROPS REÇUES - isOpen:', isOpen, 'context:', context);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [extractionMethod, setExtractionMethod] = useState<'file' | 'url' | 'text'>('file');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSourceFile(file);
      toast({
        title: "Fichier sélectionné",
        description: `${file.name} prêt pour l'extraction`,
      });
    }
  };

  const simulateExtraction = async () => {
    setIsExtracting(true);
    setExtractionProgress(0);

    // Simulation du processus d'extraction
    const steps = [
      { progress: 20, message: "Analyse du document..." },
      { progress: 40, message: "Reconnaissance optique des caractères..." },
      { progress: 60, message: "Extraction des métadonnées..." },
      { progress: 80, message: "Classification automatique..." },
      { progress: 100, message: "Extraction terminée !" }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setExtractionProgress(step.progress);
      toast({
        title: step.message,
        description: `Progression: ${step.progress}%`,
      });
    }

    // Simulation de données extraites selon le contexte
    const mockData: ExtractedData = context === 'legal' 
      ? {
          title: "Décret n° 2024-001 relatif aux procédures administratives",
          type: "Décret",
          content: "Le présent décret définit les modalités d'application des procédures administratives simplifiées...",
          reference: "J.O. n° 001 du 15/01/2024",
          date: "2024-01-15",
          author: "Ministère de l'Intérieur",
          sector: "Administration",
          keywords: ["procédure", "administration", "simplification", "décret"],
          confidence: 0.92
        }
      : {
          title: "Procédure d'obtention d'un passeport biométrique",
          type: "Procédure Administrative",
          content: "Cette procédure décrit les étapes nécessaires pour obtenir un passeport biométrique...",
          reference: "Circulaire n° 2024-PA-001",
          date: "2024-01-15",
          author: "Direction Générale de la Sûreté Nationale",
          sector: "Sécurité",
          keywords: ["passeport", "biométrique", "document", "identité"],
          confidence: 0.89,
          steps: [
            "Constituer le dossier de demande",
            "Se présenter au service des passeports",
            "Effectuer les relevés biométriques",
            "Procéder au paiement des frais",
            "Retirer le passeport"
          ],
          deadline: "15 jours ouvrables",
          documents: ["Acte de naissance", "Carte d'identité", "Justificatif de domicile", "Photos d'identité"]
        };

    setExtractedData(mockData);
    setIsExtracting(false);
    setPreviewMode(true);

    toast({
      title: "Extraction réussie",
      description: `Les données ${context === 'legal' ? 'du texte juridique' : 'de la procédure'} ont été extraites avec succès`,
    });
  };

  const handleSaveExtraction = () => {
    if (extractedData && onDataExtracted) {
      onDataExtracted(extractedData);
      toast({
        title: "Données sauvegardées",
        description: `${context === 'legal' ? 'Le texte juridique' : 'La procédure'} a été ajouté(e) à la base de données`,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setExtractedData(null);
    setSourceFile(null);
    setSourceUrl('');
    setSourceText('');
    setPreviewMode(false);
    setExtractionProgress(0);
    setIsExtracting(false);
    onClose();
  };

  const resetExtraction = () => {
    setExtractedData(null);
    setSourceFile(null);
    setSourceUrl('');
    setSourceText('');
    setPreviewMode(false);
    setExtractionProgress(0);
    setIsExtracting(false);
  };

  const getContextLabels = () => {
    return context === 'legal' 
      ? {
          title: 'Extraction automatique - Textes Juridiques',
          description: 'Utilisez l\'IA pour extraire automatiquement les métadonnées et le contenu des textes juridiques',
          fileLabel: 'Sélectionner un document juridique',
          urlPlaceholder: 'https://exemple.com/texte-juridique.pdf',
          textPlaceholder: 'Collez ici le texte du document juridique...',
          formats: 'PDF, Word, Images (JPG, PNG), Texte'
        }
      : {
          title: 'Extraction automatique - Procédures Administratives',
          description: 'Utilisez l\'IA pour extraire automatiquement les métadonnées et le contenu des procédures administratives',
          fileLabel: 'Sélectionner un document de procédure',
          urlPlaceholder: 'https://exemple.com/procedure.pdf',
          textPlaceholder: 'Collez ici le texte de la procédure administrative...',
          formats: 'PDF, Word, Images (JPG, PNG), Texte'
        };
  };

  const labels = getContextLabels();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            {labels.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">
                {labels.description}
              </p>
            </CardContent>
          </Card>

          {/* Sélection de la méthode d'extraction */}
          {!previewMode && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Source du document</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={extractionMethod === 'file' ? 'default' : 'outline'}
                    onClick={() => setExtractionMethod('file')}
                    className="flex flex-col items-center gap-2 h-20"
                  >
                    <FileImage className="w-6 h-6" />
                    Fichier local
                  </Button>
                  <Button
                    variant={extractionMethod === 'url' ? 'default' : 'outline'}
                    onClick={() => setExtractionMethod('url')}
                    className="flex flex-col items-center gap-2 h-20"
                  >
                    <Link className="w-6 h-6" />
                    URL/Lien
                  </Button>
                  <Button
                    variant={extractionMethod === 'text' ? 'default' : 'outline'}
                    onClick={() => setExtractionMethod('text')}
                    className="flex flex-col items-center gap-2 h-20"
                  >
                    <FileText className="w-6 h-6" />
                    Texte brut
                  </Button>
                </div>

                {/* Interface selon la méthode sélectionnée */}
                {extractionMethod === 'file' && (
                  <div className="space-y-4">
                    <Label>{labels.fileLabel}</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                        className="hidden"
                      />
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Parcourir
                      </Button>
                      {sourceFile && (
                        <Badge variant="secondary">
                          {sourceFile.name}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Formats supportés: {labels.formats}
                    </p>
                  </div>
                )}

                {extractionMethod === 'url' && (
                  <div className="space-y-2">
                    <Label htmlFor="source-url">URL du document</Label>
                    <Input
                      id="source-url"
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                      placeholder={labels.urlPlaceholder}
                    />
                  </div>
                )}

                {extractionMethod === 'text' && (
                  <div className="space-y-2">
                    <Label htmlFor="source-text">Texte à analyser</Label>
                    <Textarea
                      id="source-text"
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      placeholder={labels.textPlaceholder}
                      rows={6}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Bouton d'extraction */}
          {!previewMode && !isExtracting && (
            <Card>
              <CardContent className="pt-6">
                <Button 
                  onClick={simulateExtraction}
                  disabled={
                    (extractionMethod === 'file' && !sourceFile) ||
                    (extractionMethod === 'url' && !sourceUrl.trim()) ||
                    (extractionMethod === 'text' && !sourceText.trim())
                  }
                  className="w-full h-12"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Lancer l'extraction automatique
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Progression de l'extraction */}
          {isExtracting && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Extraction en cours...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={extractionProgress} className="w-full" />
                <p className="text-sm text-gray-600 mt-2">
                  {extractionProgress}% - Analyse du document avec l'intelligence artificielle
                </p>
              </CardContent>
            </Card>
          )}

          {/* Aperçu des données extraites */}
          {previewMode && extractedData && (
            <div className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Extraction terminée avec un taux de confiance de {Math.round(extractedData.confidence * 100)}%
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Aperçu des données extraites
                    </span>
                    <Badge variant="outline">
                      Confiance: {Math.round(extractedData.confidence * 100)}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Titre</Label>
                      <Input value={extractedData.title} readOnly />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Input value={extractedData.type} readOnly />
                    </div>
                    <div>
                      <Label>Date</Label>
                      <Input value={extractedData.date} readOnly />
                    </div>
                    <div>
                      <Label>Auteur</Label>
                      <Input value={extractedData.author} readOnly />
                    </div>
                    <div>
                      <Label>Référence</Label>
                      <Input value={extractedData.reference} readOnly />
                    </div>
                    <div>
                      <Label>Secteur</Label>
                      <Input value={extractedData.sector} readOnly />
                    </div>
                  </div>

                  {/* Champs spécifiques aux procédures */}
                  {context === 'procedure' && extractedData.steps && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Délai</Label>
                        <Input value={extractedData.deadline || ''} readOnly />
                      </div>
                      <div>
                        <Label>Nombre d'étapes</Label>
                        <Input value={extractedData.steps.length.toString()} readOnly />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Mots-clés</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {extractedData.keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Étapes pour les procédures */}
                  {context === 'procedure' && extractedData.steps && (
                    <div>
                      <Label>Étapes de la procédure</Label>
                      <div className="mt-2 space-y-2">
                        {extractedData.steps.map((step, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Badge variant="outline">{index + 1}</Badge>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documents requis pour les procédures */}
                  {context === 'procedure' && extractedData.documents && (
                    <div>
                      <Label>Documents requis</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {extractedData.documents.map((doc, index) => (
                          <Badge key={index} variant="outline">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Contenu extrait</Label>
                    <Textarea 
                      value={extractedData.content} 
                      rows={6} 
                      readOnly 
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button onClick={handleSaveExtraction} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder dans la base
                </Button>
                <Button variant="outline" onClick={resetExtraction}>
                  Nouvelle extraction
                </Button>
              </div>
            </div>
          )}

          {/* Aide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configuration et aide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• <strong>Précision IA:</strong> Le système utilise des modèles d'IA spécialisés pour les documents {context === 'legal' ? 'juridiques' : 'administratifs'}</p>
                <p>• <strong>Formats supportés:</strong> {labels.formats}</p>
                <p>• <strong>Extraction automatique:</strong> Titre, type, auteur, date, références, mots-clés, contenu{context === 'procedure' ? ', étapes, délais' : ''}</p>
                <p>• <strong>Validation:</strong> Toutes les données peuvent être modifiées avant sauvegarde</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}