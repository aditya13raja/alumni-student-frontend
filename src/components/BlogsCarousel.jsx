import * as React from "react";
import { Link } from "react-router-dom"; // assuming you use react-router
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export function BlogsCarousel({ blogs }) {
  return (
    <div className="w-full flex flex-col items-center relative">
      <Carousel className="w-full max-w-5xl relative">
        <CarouselContent>
          {blogs.map((blog) => (
            <CarouselItem key={blog.id}>
              <div className="p-1">
                <Card className="overflow-hidden">
                  <Link to={`/blogs/${blog.id}`} className="block w-full h-full">
                    <div className="relative w-full">
                      {/* Preserve image aspect ratio and make it mobile-friendly */}
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={blog.cover_image}
                          alt={blog.heading}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute bottom-0 w-full bg-black/50 text-white text-center p-2">
                        <p className="text-xs md:text-sm font-semibold">{blog.heading}</p>
                      </div>
                    </div>
                  </Link>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows inside the carousel container, hidden on mobile */}
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 hidden md:block">
          <CarouselPrevious className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200" />
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 hidden md:block">
          <CarouselNext className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200" />
        </div>
      </Carousel>

      <Button asChild className="mt-6">
        <Link to="/blogs">Read More Blogs</Link>
      </Button>
    </div>
  );
}

