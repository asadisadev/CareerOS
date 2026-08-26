import { AuthFade, AuthHeading, AuthError } from './auth-shell';
import { OAuthButtons, AuthDivider } from './oauth-buttons';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      // Redirect happens inside context
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AuthFade>
          <AuthHeading
            title="Welcome back"
            subtitle="Sign in to continue your career journey"
          />
          <AuthError message={error} />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <div className="text-center text-sm">
            <Link to="/auth/forgot-password" className="text-muted-foreground hover:text-foreground">
              Forgot password?
            </Link>
          </div>
          <AuthDivider />
          <OAuthButtons label="Sign in" />
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/auth/register" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </AuthFade>
      </div>
    </div>
  );
}














// CORRECT



// import { AuthFade, AuthHeading, AuthError } from './auth-shell';
// import { OAuthButtons, AuthDivider } from './oauth-buttons';
// import { Button } from '../../components/ui/button';
// import { Input } from '../../components/ui/input';
// import { Label } from '../../components/ui/label';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }
//     // Placeholder – replace with real auth
//     console.log('Login attempt', { email, password });
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         <AuthFade>
//           <AuthHeading
//             title="Welcome back"
//             subtitle="Sign in to continue your career journey"
//           />
//           <AuthError message={error} />
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <Button type="submit" variant="hero" className="w-full">
//               Sign in
//             </Button>
//           </form>
//           <div className="text-center text-sm">
//             <Link to="/auth/forgot-password" className="text-muted-foreground hover:text-foreground">
//               Forgot password?
//             </Link>
//           </div>
//           <AuthDivider />
//           <OAuthButtons label="Sign in" />
//           <p className="text-center text-sm text-muted-foreground">
//             Don't have an account?{' '}
//             <Link to="/auth/register" className="font-semibold text-primary hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </AuthFade>
//       </div>
//     </div>
//   );
// }