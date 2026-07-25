import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Link2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input, Label, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCreateLink } from "@/hooks/useLinks";
import { getMessage } from "@/helper";

export default function CreateLinkPage() {
  const navigate = useNavigate();
  const { mutate, isPending, error, reset } = useCreateLink();
  const [original, setOriginal] = useState("");
  const [alias, setAlias] = useState("");
  const [status, setStatus] = useState<LinkStatus>("ACTIVE");
  const [successShort, setSuccessShort] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setValidationError(null);
    reset();

    if (!original.trim()) {
      setValidationError("Enter a destination URL.");
      return;
    }
    if (alias && !/^[a-z0-9-]+$/i.test(alias)) {
      setValidationError(
        "Alias can only contain letters, numbers, and hyphens.",
      );
      return;
    }

    mutate(
      { url: original.trim(), code: alias.trim() || undefined, status },
      {
        onSuccess: (link) => {
          setSuccessShort(link.shortCode);
          setTimeout(() => navigate("/"), 900);
        },
      },
    );
  }

  const displayedError =
    validationError ?? getMessage("Failed to create link", error);

  return (
    <div className="max-w-110 animate-fade-up">
      <PageHeader
        title="Create a short URL"
        subtitle="Turn a long link into something easy to share and track."
      />

      <Card className="p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Destination URL</Label>
            <Input
              placeholder="https://example.com/your-long-link"
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <Label>Custom alias (optional)</Label>
            <Input
              prefix="lnk.ly/"
              placeholder="my-link"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>

          <div>
            <Label>Status</Label>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as LinkStatus)}
            >
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
            </Select>
          </div>

          {displayedError && (
            <p className="text-xs text-danger">{displayedError}</p>
          )}

          <div className="flex gap-2 pt-1">
            <Button
              type="submit"
              loading={isPending}
              icon={<Link2 size={16} />}
            >
              Create link
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>

          {successShort && (
            <div className="mt-4 bg-success-soft rounded-lg px-3.5 py-3 flex items-center gap-2 animate-fade-up">
              <Check size={15} className="text-success" />
              <p className="text-[13px] text-success">
                Link created{" "}
                <span className="font-mono font-medium">{successShort}</span>
              </p>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}
