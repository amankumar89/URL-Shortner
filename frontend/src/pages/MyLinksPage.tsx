import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { LinksTable } from "@/components/links/LinksTable";
import { useLinks, useToggleLinkStatus } from "@/hooks/useLinks";

export default function MyLinksPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useLinks();
  const { mutate: toggleStatus } = useToggleLinkStatus();
  const [search, setSearch] = useState("");

  const links = data?.links ?? [];

  const filtered = useMemo(() => {
    const term = search?.trim()?.toLowerCase();
    if (!term) return links;
    return links?.filter(
      (l) =>
        l?.targetUrl?.toLowerCase()?.includes(term) ||
        l?.shortCode?.toLowerCase()?.includes(term),
    );
  }, [links, search]);

  function handleRowClick(link: ShortLink) {
    navigate(`/links/${link?.id}`);
  }

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="My links"
        subtitle="All your short links in one place."
        action={
          <div className="w-55">
            <Input
              placeholder="Search links"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              prefix={<Search size={14} />}
            />
          </div>
        }
      />

      {isLoading ? null : (
        <LinksTable
          links={filtered}
          onRowClick={handleRowClick}
          onToggleStatus={(l) => toggleStatus(l.id)}
          showActions
          emptyLabel={search ? "No links match your search." : "No links yet."}
        />
      )}
    </div>
  );
}
