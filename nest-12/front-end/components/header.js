import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const path = router.pathname;

  const handleRouter = (r) => {
    router.push(r);
  };

  return (
<div className="bg-primary w-full sticky top-0 text-white flex justify-between items-center shadow-lg z-50">
  <h1 className="text-2xl font-bold px-8 py-4 tracking-wide">
    ebo_eCommerce
  </h1>
  <div className="flex gap-4 pr-8">
    {[
      { label: "Home", route: "/" },
      { label: "Users", route: "/users" },
      { label: "Products", route: "/products" },
      { label: "Orders", route: "/orders" },
      { label: "Reviews", route: "/reviews" },
    ].map(({ label, route }) => (
      <div
        key={route}
        onClick={() => handleRouter(route)}
        className={`cursor-pointer font-medium text-lg px-5 py-2 rounded-lg transition-all ${
          path === route
            ? "bg-primary-dark shadow-md"
            : "hover:bg-primary-dark active:brightness-90"
        }`}
      >
        {label}
      </div>
    ))}
  </div>
</div>
  );
};
