import type { Metadata } from "next";
import { comparisonArticles, getComparisonArticle } from "@/lib/comparisons";
import ComparisonDetailClient from "./ComparisonDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisonArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getComparisonArticle(slug);
  if (!article) return { title: "Comparison Not Found" };

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      images: [article.coverImage],
      type: "article",
      publishedTime: article.publishedDate,
    },
  };
}

export default async function ComparisonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getComparisonArticle(slug);
  if (!article) notFound();

  return <ComparisonDetailClient article={article} />;
}
