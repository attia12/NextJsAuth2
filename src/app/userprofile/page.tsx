
import { auth, signOut } from "@/auth";
import UserProfileForm from "@/components/UserProfileForm";
import { redirect } from "next/navigation";




export default async function UserProfile() {
    const session = await auth();
    const user = session?.user;
    
    
   
   if (!session) return redirect("/profile");
   
   return  <div>
   <h1>Edit Profile</h1>
   <UserProfileForm user={user} />
<form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
<button
  className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
>
  Sign Out
</button>
</form>
 </div>
}