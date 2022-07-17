import { withSSRContext } from 'aws-amplify';
import { useRouter } from 'next/router';
import { Secret } from '../../models';

interface SecretPageProps {
  secret: {
    value: string;
    key: string;
  };
}

export default function SecretPage({ secret }: SecretPageProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <div>{secret.value}</div>;
}

export async function getStaticProps(req: any) {
  const { DataStore } = withSSRContext({ req });
  const { params } = req;
  const { id } = params;
  const secret = await DataStore.query(Secret, id);

  return {
    props: {
      secret: JSON.parse(JSON.stringify(secret)),
    },
    revalidate: 1,
  };
}
