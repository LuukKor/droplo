'use client';
import { EmptyList } from './_components/EmptyList';

export default function Home() {
  return <EmptyList onClick={() => alert('ok')} />;
}
