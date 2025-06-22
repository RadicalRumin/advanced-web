import BoekjePageClient from './BoekjePageClient';

type BoekjePageProps = {
    id: string;
};

export default function BoekjePage({ id }: BoekjePageProps) {
    return <BoekjePageClient bookId={id} />;
}