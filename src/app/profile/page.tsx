
import {auth, signIn } from "@/auth"

 
export default async function SignIn() {
    const session= await auth();
   
    const user=session?.user
    console.log(user)
  return  (
  <>
  <h1 className="text-3xl">Welcome</h1>
  <form
      action={async () => {
        "use server"
        await signIn("google",{redirectTo:"/userprofile"})
      }}
    >
      <button className="p-2 border-2 bg-blue-400">Sign In with Google</button>
    </form>
  </>
  )
} 
