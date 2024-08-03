import Link from "next/link";

export default function GithubLogin() {    

  return (
    <Link href='/login' className="ml-5 p-2 border rounded-full bg-red-500 text-white">
      로그인
    </Link>
  );
}
