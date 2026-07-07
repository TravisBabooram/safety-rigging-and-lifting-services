import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { MotionWrapper } from "@/components/animations/MotionWrapper";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <MotionWrapper className="max-w-md w-full">
      <Card className="text-center shadow-industrial">
        <CardContent className="p-8 space-y-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary mx-auto">
            <AlertTriangle className="h-10 w-10 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <h2 className="text-xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. The page may have been moved or doesn't exist.
            </p>
          </div>

          <div className="space-y-3">
            <Button variant="cta" className="w-full" asChild>
              <Link to="/">
                <Home className="h-5 w-5 mr-2" />
                Return to Home
              </Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
      </MotionWrapper>
    </div>
  );
};

export default NotFound;
