import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useMe, useUpdateUser } from "@/hooks/useAuth";

export default function SettingsPage() {
  const { data: user } = useMe();
  const { mutate, isPending } = useUpdateUser();

  const [form, setForm] = useState<UpdateUser | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user && !form)
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        password: null,
      });
  }, [user, form]);

  if (!form) return null;

  function update<K extends keyof UpdateUser>(key: K, value: UpdateUser[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  return (
    <div className="max-w-110 animate-fade-up">
      <PageHeader
        title="Settings"
        subtitle="Manage your workspace preferences."
      />

      <Card className="p-5">
        <p className="text-[13px] font-medium mb-3">Workspace</p>
        <div className="space-y-4 mb-5">
          <div>
            <Label>First Name</Label>
            <Input
              value={form?.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input
              value={form?.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              value={form?.password ?? undefined}
              onChange={(e) => update("password", e.target.value)}
            />
          </div>
          {/* <div>
            <Label>Default domain</Label>
            <Select
              value={form?.defaultDomain}
              onChange={(e) => update("defaultDomain", e.target.value)}
            >
              <option value="lnk.ly">lnk.ly</option>
              <option value="go.acmecorp.com">go.acmecorp.com</option>
            </Select>
          </div> */}
        </div>

        <div className="border-t border-border-soft my-5" />

        {/* <p className="text-[13px] font-medium mb-3">Preferences</p>
        <div className="space-y-3 mb-6">
          <ToggleRow
            label="Email me weekly click summaries"
            checked={form?.weeklyDigest}
            onChange={(v) => update("weeklyDigest", v)}
          />
          <ToggleRow
            label="Auto-expire links after 1 year"
            checked={form?.autoExpire}
            onChange={(v) => update("autoExpire", v)}
          />
        </div> */}

        <div className="flex items-center gap-3">
          <Button loading={isPending} onClick={() => mutate(form)}>
            Save changes
          </Button>
          {saved && (
            <span className="inline-flex items-center gap-1 text-[13px] text-success animate-fade-up">
              <Check size={14} />
              Saved
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}

// function ToggleRow({
//   label,
//   checked,
//   onChange,
// }: {
//   label: string;
//   checked: boolean;
//   onChange: (v: boolean) => void;
// }) {
//   return (
//     <label className="flex items-center justify-between cursor-pointer group">
//       <span className="text-[13px] text-text-primary">{label}</span>
//       <button
//         type="button"
//         role="switch"
//         aria-checked={checked}
//         onClick={() => onChange(!checked)}
//         className={`relative h-5 w-9 rounded-full transition-colors cursor-pointer ${
//           checked ? "bg-accent" : "bg-surface-3"
//         }`}
//       >
//         <span
//           className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
//             checked ? "translate-x-[18px]" : "translate-x-0.5"
//           }`}
//         />
//       </button>
//     </label>
//   );
// }
