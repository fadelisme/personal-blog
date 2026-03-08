import { authenticate } from "./actions";
import { Terminal, Lock } from "lucide-react";

export const metadata = { title: "System Login" };

export default async function LoginPage(props: { searchParams: Promise<{ error?: string }> }) {
    const searchParams = await props.searchParams;
    const error = searchParams?.error;

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 font-mono">
            <div className="w-full max-w-sm border border-white/10 bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl relative">

                {/* Abstract top border */}
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

                <div className="p-8">
                    <div className="flex items-center gap-3 mb-8 text-indigo-400">
                        <Terminal />
                        <h1 className="text-xl font-bold tracking-wider">SECURE_ACCESS</h1>
                    </div>

                    <form action={authenticate} className="space-y-6">
                        <div className="space-y-2 relative">
                            <label htmlFor="password" className="text-xs text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Lock size={12} /> Master Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                autoFocus
                                className="w-full bg-black border border-white/10 p-3 rounded text-indigo-400 focus:outline-none focus:border-indigo-500 transition-colors font-mono tracking-widest"
                                placeholder="••••••••"
                            />

                            {error && (
                                <p className="text-red-500 text-xs mt-2 animate-pulse">
                                    ERROR: {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded font-bold tracking-widest transition-colors flex justify-center items-center gap-2"
                        >
                            AUTHENTICATE
                        </button>
                    </form>

                </div>
            </div>

            <p className="mt-8 text-xs text-zinc-600">
                UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED.
            </p>
        </div>
    );
}
