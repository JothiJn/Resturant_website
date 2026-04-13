import { login, signup, signInWithGoogle } from './actions'

export default async function LoginPage(props: { searchParams?: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error;

  return (
    <div className="flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-6 relative w-full h-full min-h-[60vh]">
      
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brown/5 rounded-full blur-3xl -z-10 mt-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy/5 rounded-full blur-3xl -z-10 mb-10"></div>
      
      <div className="w-full max-w-sm bg-white p-8 border border-navy/10 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-brown"></div>
        <h1 className="text-3xl font-serif text-navy text-center mb-2">Welcome Back</h1>
        <p className="text-xs tracking-widest uppercase text-navy/50 text-center mb-8 font-bold">Access your reservations</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 mb-6 border border-red-100 flex items-center justify-center font-bold tracking-wide">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-widest uppercase text-navy/70" htmlFor="email">Email Address</label>
            <input
              className="px-4 py-3 bg-[#f4f3ed]/50 text-sm text-navy focus:outline-none focus:border-brown border border-navy/10 transition-colors w-full"
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-widest uppercase text-navy/70" htmlFor="password">Password</label>
            <input
              className="px-4 py-3 bg-[#f4f3ed]/50 text-sm text-navy focus:outline-none focus:border-brown border border-navy/10 transition-colors w-full"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button 
              formAction={login}
              className="w-full py-4 bg-navy text-white text-xs font-bold uppercase tracking-widest hover:bg-navy/90 transition-colors cursor-pointer"
            >
              Log In
            </button>
            <button 
              formAction={signup}
              className="w-full py-4 bg-transparent border border-navy/20 text-navy text-xs font-bold uppercase tracking-widest hover:bg-navy/5 transition-colors cursor-pointer"
            >
              Sign Up
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-navy/10"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                <span className="bg-white px-3 text-navy/40">Or continue with</span>
              </div>
            </div>

            <button 
              formAction={signInWithGoogle}
              className="w-full py-4 bg-white border border-navy/20 text-navy text-xs font-bold uppercase tracking-widest hover:bg-[#f4f3ed] transition-colors flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
