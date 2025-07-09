import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Printer, Download, Calendar } from "lucide-react";

const documents = [
  {
    name: "Medical Report",
    type: "PDF",
    date: "2024-01-15",
    size: "2.4 MB",
  },
  {
    name: "Lab Results",
    type: "PDF",
    date: "2024-01-12",
    size: "1.2 MB",
  },
  {
    name: "Prescription",
    type: "PDF",
    date: "2024-01-15",
    size: "0.8 MB",
  },
  {
    name: "Insurance Card",
    type: "Image",
    date: "2024-01-01",
    size: "0.5 MB",
  },
];

export function DocumentsCard() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((document, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{document.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{document.type}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {document.date}
                    </span>
                    <span>•</span>
                    <span>{document.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="View Document"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button className="w-full" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Print All Documents
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
