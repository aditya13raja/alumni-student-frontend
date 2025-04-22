import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, category_fullname, category_description }) => {
  return (
    <Link to={`/categories/${category}`} className="h-full">
      <Card className="h-full bg-[hsl(var(--background))]/70 backdrop-blur-md border border-[hsl(var(--border))] hover:shadow-lg transition-all duration-300 rounded-2xl flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-xl text-[hsl(var(--foreground))]">
            {category_fullname}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            {category_description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;

