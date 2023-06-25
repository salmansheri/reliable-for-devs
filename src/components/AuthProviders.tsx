'use client'; 


import { FC, useState, useEffect } from 'react'; 
import { getProviders, signIn } from 'next-auth/react'; 
import { ProviderType  } from '@/lib/validators/Providers';
import { Button } from './ui/button';
import { Github } from 'lucide-react'; 

interface AuthProvidersProps {
  
}

type Providers = Record<string, ProviderType>; 



const AuthProviders: FC<AuthProvidersProps> = ({}) => {
  const [providers, setProviders] = useState<Providers | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders(); 

      console.log(response);
      // @ts-ignore 
      setProviders(response); 
    }

    fetchProviders(); 

  }, []); 
  if(providers) {
    return(
      <div>
        {Object.values(providers).map((provider: ProviderType) => (
          <Button onClick={() => signIn(provider?.id)} key={provider?.id}>
            <Github />
            {provider?.name}
          </Button>
        ))}
      </div>
    )
  }


  return <div>AuthProviders</div>
}

export default AuthProviders