'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function GithubSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
        signIn('github', { callbackUrl: callbackUrl ?? '/sample' })
      }
    >
      <Icons.gitHub className="w-4 h-4 mr-2" />
      Continue with Github
    </Button>
  );
}
