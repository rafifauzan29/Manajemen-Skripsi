import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    redirect("/auth/login");
  }

  try {
    const user = JSON.parse(userCookie.value);

    if (user.role === "MAHASISWA") {
      redirect("/mahasiswa/dashboard");
    } else if (user.role === "DOSEN") {
      redirect("/dosen/dashboard");
    } else if (user.role === "ADMIN") {
      redirect("/admin/dashboard");
    } else {
      redirect("/auth/login");
    }
  } catch (err) {
    redirect("/auth/login");
  }

  return null;
}
