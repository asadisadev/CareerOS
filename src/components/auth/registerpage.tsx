import { AuthFade, AuthHeading, AuthError } from './auth-shell';
import { OAuthButtons, AuthDivider } from './oauth-buttons';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    console.log('Register attempt', { name, email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AuthFade>
          <AuthHeading
            title="Create your account"
            subtitle="Start building your career with AI"
          />
          <AuthError message={error} />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
            <Button type="submit" variant="hero" className="w-full">
              Create account
            </Button>
          </form>
          <AuthDivider />
          <OAuthButtons label="Sign up" />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </AuthFade>
      </div>
    </div>
  );
}