import { createFileRoute } from "@tanstack/react-router";
import SearchPage from "@/pages/search";
import { searchParamsSchema } from "@/schemas/params.schema";



export const Route = createFileRoute("/search")({
  validateSearch: (search) => searchParamsSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  return <SearchPage search={search} navigate={(opts) => void navigate(opts)} />;
}
