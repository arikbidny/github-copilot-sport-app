import Image from "next/image";

export default async function Home() {
  return (
    <div className=" p-4 h-full">
      <div className="flex justify-center pb-10">
        <Image
          src="/copilotimage.avif"
          alt="copilot"
          width="1024"
          height="768"
        />
      </div>
      <div>
        <div className="flex flex-row">
          <h1 className="text-2xl font-bold pr-3">Dear</h1>
          <Image src="/outbrain.png" alt="logo" width={164} height={48} />
        </div>
        <p className="text-lg">
          We are thrilled to welcome you to our event and are honored to have
          you lead the Advanced GitHub Copilot Hands-on Workshop. Your expertise
          in cutting-edge sports technology and software development makes you
          the perfect partner for this deep dive into AI-powered coding. We are
          confident that your insights and practical guidance will empower our
          participants to harness GitHub Copilot to its fullest potential. Thank
          you for joining us in advancing the future of software development!
        </p>
      </div>
      {/* use nextjs Image to add github copilot image */}
    </div>
  );
}
