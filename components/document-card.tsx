import { FileText, File, FileUp, AlertCircle, Loader2, MoreHorizontal, Download, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DocumentCardProps {
  document: {
    id: string
    name: string
    size: string
    pages: number
    uploadedAt: string
    status: string
  }
}

export function DocumentCard({ document }: DocumentCardProps) {
  const getFileIcon = () => {
    if (document.name.endsWith(".pdf")) {
      return <FileText className="size-5" />
    } else if (document.name.endsWith(".txt")) {
      return <File className="size-5" />
    } else if (document.name.endsWith(".md")) {
      return <FileUp className="size-5" />
    } else {
      return <File className="size-5" />
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300">
              {getFileIcon()}
            </div>
            <div>
              <h3 className="font-medium">{document.name}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{document.size}</span>
                <span>•</span>
                <span>{document.pages} pages</span>
                <span>•</span>
                <span>Uploaded {document.uploadedAt}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {document.status === "processing" ? (
              <Badge variant="outline" className="flex items-center gap-1">
                <Loader2 className="size-3 animate-spin" />
                Processing
              </Badge>
            ) : document.status === "processed" ? (
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
              >
                Processed
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800"
              >
                <AlertCircle className="size-3 mr-1" />
                Error
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {document.status === "processing" && <Progress value={45} className="h-1 mt-4" />}
      </CardContent>
    </Card>
  )
}
