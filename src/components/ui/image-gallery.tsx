import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  label: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  return (
    <div className={cn("flex items-center gap-2 h-[380px] w-full", className)}>
      {images.map((img, idx) => (
        <div
          key={idx}
          className="relative group flex-grow transition-all w-14 rounded-xl overflow-hidden h-full duration-500 hover:w-full cursor-pointer"
        >
          <img
            className="h-full w-full object-cover object-center"
            src={img.src}
            alt={img.label}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-white font-semibold text-sm drop-shadow-lg">
              {img.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
