
interface MdxVideoProps {
  src: string;
  width: number;
}

export function MdxVideo({
  src,
  width,
  ...props
}: MdxVideoProps) {
  
  return (
    <div
      className={`flex justify-center border my-8`}
      {...props}
    >
      <video controls width={width} className="my-0">
        <source src={src} type="video/mp4" />
      </video>      
    </div>
  );
}