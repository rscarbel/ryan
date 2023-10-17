import UserDefinedContent from "@/app/common/UserDefinedContent";

export default async function Hero() {
  return (
    <section className="flex flex-col items-center justify-center">
      <UserDefinedContent contentKey="SITE_HEADLINE" elementType="h1" />
    </section>
  );
}
