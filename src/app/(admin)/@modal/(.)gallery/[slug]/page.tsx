import { X } from 'lucide-react';

export default function InterceptPage({ params }: { params: { slug: string } }) {  
  const isModal = true;
  console.log(params.slug);
  return (
    <div className='absolute w-full h-full bg-black z-50'>1123123123</div>
    // <section className='w-full absolute -left-6 h-full min-h-dvh bg-red-200'>
    //   <div className="flex flex-col flex-1">
    //     <div className={`w-full h-full pt-7 sm:pt-10 ${isModal ? 'fixed z-50 bg-opacity-70 backdrop-blur-sm overflow-auto bg-gray-500 sm:py-10' : ''} `}>
    //       <div className={`${isModal ? 'sticky top-40' : ''} flex justify-center`}>
    //         <div
    //           className={` max-w-md w-full h-auto flex flex-col text-gray-900 space-y-8 bg-white rounded-lg p-8 ${isModal ? 'shadow-lg' : ''}`}
    //         >
    //           <div className='relative'>
    //             <div className={`${isModal ? 'absolute top-0 right-0' : 'hidden'}`}>
    //               <X className="size-5 text-gray-900" />
    //             </div>
    //             <div>here is the contents</div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
