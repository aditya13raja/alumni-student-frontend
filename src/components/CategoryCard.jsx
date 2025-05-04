import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, category_fullname, category_description }) => {
    return (
        <Link to={`/topics/${category}`} className="h-full">
            <Card className="glass-card hover:scale-103 hover:shadow-xl">
                <CardHeader>
                    <CardTitle className="text-xl text-[hsl(var(--foreground))]">
                        {category_fullname}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                    <p className="text-[hsl(var(--muted-foreground))] text-md">
                        {category_description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
};

export default CategoryCard;

