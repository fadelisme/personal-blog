"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(formData: FormData) {
    const password = formData.get("password") as string;
    const adminPassword = process.env.ADMIN_PASSWORD || "fadelisme-admin";

    if (password === adminPassword) {
        // In a real app, use iron-session or jose for JWT.
        // For this personal CMS, a simple secure cookie suffices since it's just one admin.
        const cookieStore = await cookies();
        cookieStore.set("cms_token", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });
        redirect("/cms");
    } else {
        redirect("/login?error=Invalid Credentials");
    }
}
