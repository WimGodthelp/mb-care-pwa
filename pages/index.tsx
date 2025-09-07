import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function App() {
  const [tab, setTab] = useState("today");
  const [showPhone, setShowPhone] = useState(true);

  const [weight, setWeight] = useState<number>(74.5);
  const [goal, setGoal] = useState<string>("-1.0 kg deze week, 8.000+ stappen/dag");
  const [kcalIn, setKcalIn] = useState<number>(1650);
  const [kcalOut, setKcalOut] = useState<number>(450);
  const [steps, setSteps] = useState<number>(9200);
  const [notes, setNotes] = useState<string>("Voelde me energiek, training A volbracht.");

  const [contentChecks, setContentChecks] = useState({
    photo: false,
    workout: false,
    meal: false,
    vlog: false,
  });

  const [allergies, setAllergies] = useState({
    glutenfree: false,
    lactose: false,
    nuts: false,
    egg: false,
    fish: false,
  });

  const [diet, setDiet] = useState("regular");

  type MediaItem = {
    id: string;
    type: "image" | "video";
    url: string;
    name: string;
    date: string;
    ai: null | { items: { name: string; portion: string; kcal: number }[]; totalKcal: number };
  };
  const [media, setMedia] = useState<MediaItem[]>([]);

  const BRAND = {
    name: "MB Care",
    colors: { blue: "#1E5E82", pink: "#F24393", pink2: "#FF6FB2" },
    whatsapp: {
      number: "31648197794",
      message: encodeURIComponent("Hoi coach! Ik heb een vraag over mijn voortgang."),
    },
  };

  function toggle(key: keyof typeof contentChecks) {
    setContentChecks((s) => ({ ...s, [key]: !s[key] }));
  }

  function onAddMedia(files: FileList | null) {
    const items: MediaItem[] = Array.from(files || [])
      .slice(0, 10)
      .map((f) => ({
        id: Math.random().toString(36).slice(2),
        type: f.type.startsWith("video") ? "video" : "image",
        url: URL.createObjectURL(f),
        name: f.name,
        date: new Date().toISOString(),
        ai: null,
      }));
    setMedia((m) => [...items, ...m]);
  }

  async function analyzeMeal(id: string) {
    const demo = {
      items: [
        { name: "kipfilet", portion: "150 g", kcal: 165 },
        { name: "broccoli", portion: "200 g", kcal: 70 },
        { name: "zilvervliesrijst", portion: "50 g droog", kcal: 180 },
      ],
      totalKcal: 415,
    };
    await new Promise((r) => setTimeout(r, 400));
    setMedia((ms) => ms.map((m) => (m.id === id ? { ...m, ai: demo } : m)));
  }

  const weekData = [
    { w: "W1", kg: 74.5 },
    { w: "W2", kg: 73.6 },
    { w: "W3", kg: 72.9 },
    { w: "W4", kg: 72.1 },
  ];

  const AppShell = (
    <div className="min-h-full bg-white text-gray-900">
      <div className="p-4 space-y-4">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo (MB in roze gradient) */}
            <svg width="40" height="40" viewBox="0 0 100 100" aria-label="MB Care">
              <defs>
                <linearGradient id="mbPink" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={BRAND.colors.pink} />
                  <stop offset="100%" stopColor={BRAND.colors.pink2} />
                </linearGradient>
              </defs>
              <rect rx="20" ry="20" width="100" height="100" fill="url(#mbPink)" />
              <text
                x="50"
                y="58"
                textAnchor="middle"
                fontFamily="ui-sans-serif, system-ui"
                fontSize="46"
                fontWeight={800}
                fill="#fff"
              >
                MB
              </text>
            </svg>
            <h1 className="text-xl" style={{ color: BRAND.colors.blue }}>
              Care • Coach
            </h1>
          </div>
          <div className="text-xs" style={{ color: BRAND.colors.blue }}>
            Demo
          </div>
        </header>

        <Tabs defaultValue="today" value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-4 text-xs">
            <TabsTrigger value="today">Dagboek</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="setup">Instellen</TabsTrigger>
          </TabsList>

          {/* DAGBOEK */}
          <TabsContent value="today" className="grid gap-3">
            <Card>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span>📝</span>
                  <h2>Dagboek (vandaag)</h2>
                </div>

                <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
                  <div>
                    <Label>Voeding (kcal)</Label>
                    <Input
                      type="number"
                      value={kcalIn}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setKcalIn(parseInt(e.target.value || "0", 10))
                      }
                      placeholder="(kcal)"
                    />
                  </div>
                  <div>
                    <Label>Verbrande (kcal)</Label>
                    <Input
                      type="number"
                      value={kcalOut}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setKcalOut(parseInt(e.target.value || "0", 10))
                      }
                      placeholder="(kcal)"
                    />
                  </div>
                  <div>
                    <Label>Stappen (aantal)</Label>
                    <Input
                      type="number"
                      value={steps}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSteps(parseInt(e.target.value || "0", 10))
                      }
                      placeholder="(aantal)"
                    />
                  </div>
                  <div>
                    <Label>Gewicht (kg)</Label>
                    <Input
                      type="number"
                      step={0.1}
                      value={weight}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setWeight(parseFloat(e.target.value || "0"))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Opmerkingen</Label>
                  <textarea
                    className="border rounded-xl p-2"
                    style={{ width: "100%", minHeight: 80 }}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: ".5rem" }}>
                  <label className="flex items-center gap-2">
                    <Checkbox checked={contentChecks.photo} onCheckedChange={() => toggle("photo")} /> Foto
                    update
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={contentChecks.workout}
                      onCheckedChange={() => toggle("workout")}
                    />{" "}
                    Workout-clip
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox checked={contentChecks.meal} onCheckedChange={() => toggle("meal")} />{" "}
                    Maaltijdfoto
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox checked={contentChecks.vlog} onCheckedChange={() => toggle("vlog")} />{" "}
                    Mini-vlog/quote
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span>⚖️</span>
                  <h2>Gewicht (laatste 4 weken)</h2>
                </div>
                <div style={{ width: "100%", height: 160 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weekData}>
                      <XAxis dataKey="w" />
                      <YAxis domain={[70, 76]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="kg" strokeWidth={3} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* WEEK */}
          <TabsContent value="week" className="grid gap-3">
            <Card>
              <CardContent>
                <h2>Weekdoel & Resultaat</h2>
                <Label>Weekdoel</Label>
                <Input value={goal} onChange={(e) => setGoal(e.target.value)} />
                <div className="text-sm text-gray-600">
                  Aanbevolen menu verschijnt hier (op basis van voorkeuren).
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2>Kcal balans</h2>
                <div style={{ width: "100%", height: 160 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[{ label: "In", v: kcalIn }, { label: "Uit", v: kcalOut }]}>
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="v" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MEDIA */}
          <TabsContent value="media" className="grid gap-3">
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>📷</span>
                    <h2>Media upload</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="captureCamera"
                      type="file"
                      accept="image/*,video/*"
                      capture="environment"
                      onChange={(e) => onAddMedia(e.target.files)}
                      className="hidden"
                    />
                    <Button
                      style={{
                        background: `linear-gradient(135deg, ${BRAND.colors.pink}, ${BRAND.colors.pink2})`,
                        color: "#fff",
                      }}
                      onClick={() => document.getElementById("captureCamera")?.click()}
                    >
                      Neem foto/video
                    </Button>
                    <input
                      id="chooseFiles"
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={(e) => onAddMedia(e.target.files)}
                      className="hidden"
                    />
                    <Button onClick={() => document.getElementById("chooseFiles")?.click()}>
                      Upload uit galerij
                    </Button>
                  </div>
                </div>

                <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
                  {media.length === 0 && (
                    <div className="text-xs text-gray-500">Nog geen media geüpload.</div>
                  )}

                  {media.map((item) => (
                    <div key={item.id} className="border rounded-xl">
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          style={{ width: "100%", height: 160, objectFit: "cover" }}
                        />
                      ) : (
                        <video
                          src={item.url}
                          style={{ width: "100%", height: 160, objectFit: "cover" }}
                          controls
                        />
                      )}

                      <div className="p-2 text-xs text-gray-600">{item.name}</div>

                      {item.type === "image" && (
                        <div className="p-2 flex gap-2">
                          <Button
                            onClick={() => analyzeMeal(item.id)}
                            style={{ background: BRAND.colors.blue, color: "#fff" }}
                          >
                            AI kcal
                          </Button>
                          {item.ai && (
                            <Button onClick={() => setKcalIn(item.ai!.totalKcal)}>
                              Zet {item.ai!.totalKcal} kcal → Dagboek
                            </Button>
                          )}
                        </div>
                      )}

                      {item.ai && (
                        <div className="p-2" style={{ background: "#f9fafb" }}>
                          <div className="text-xs">
                            <strong>Herkenning</strong>
                          </div>
                          <ul className="text-xs" style={{ paddingLeft: "1rem" }}>
                            {item.ai.items.map((it, idx) => (
                              <li key={idx}>
                                {it.name} – {it.portion} – {it.kcal} kcal
                              </li>
                            ))}
                          </ul>
                          <div className="text-xs">
                            <strong>Totaal:</strong> {item.ai.totalKcal} kcal
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* INSTELLEN */}
          <TabsContent value="setup" className="grid gap-3">
            <Card>
              <CardContent>
                <h2>Voedingsvoorkeuren & Allergieën</h2>

                <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: ".5rem" }}>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={allergies.glutenfree}
                      onCheckedChange={() =>
                        setAllergies((a) => ({ ...a, glutenfree: !a.glutenfree }))
                      }
                    />
                    Glutenvrij
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={allergies.lactose}
                      onCheckedChange={() => setAllergies((a) => ({ ...a, lactose: !a.lactose }))}
                    />
                    Lactose-intolerant
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={allergies.nuts}
                      onCheckedChange={() => setAllergies((a) => ({ ...a, nuts: !a.nuts }))}
                    />
                    Notenallergie
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={allergies.egg}
                      onCheckedChange={() => setAllergies((a) => ({ ...a, egg: !a.egg }))}
                    />
                    Eiallergie
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={allergies.fish}
                      onCheckedChange={() => setAllergies((a) => ({ ...a, fish: !a.fish }))}
                    />
                    Vis/schaaldier
                  </label>
                </div>

                <Label>Dieetvoorkeur</Label>
                <select
                  className="border rounded-xl px-3 py-2"
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                >
                  <option value="regular">Normaal</option>
                  <option value="vegetarian">Vegetarisch</option>
                  <option value="pescatarian">Pescotarisch</option>
                  <option value="lowcarb">Low-carb</option>
                  <option value="highprotein">High-protein</option>
                </select>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-gray-500" style={{ fontSize: 10 }}>
          © 2025 – MB Care MVP (PWA). Data lokaal.
        </div>

        <div className="flex justify-center pt-2">
          <Button onClick={() => setShowPhone(!showPhone)}>
            {showPhone ? "Toon volle breedte" : "Toon iPhone frame"}
          </Button>
        </div>

        {/* WhatsApp knop */}
        <a
          href={`https://wa.me/${BRAND.whatsapp.number}?text=${BRAND.whatsapp.message}`}
          target="_blank"
          rel="noreferrer"
          style={{ position: "fixed", right: 20, bottom: 20 }}
        >
          <div
            className="rounded-full shadow-2xl px-4 py-3 text-white flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${BRAND.colors.pink}, ${BRAND.colors.pink2})`,
            }}
          >
            <span>💬</span>
            <span className="text-sm">Chat met coach</span>
          </div>
        </a>
      </div>
    </div>
  );

  return showPhone ? <Frame>{AppShell}</Frame> : AppShell;
}

/** iPhone-achtige frame voor de preview */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center">
      <div
        className="relative bg-black rounded-2xl p-3 shadow-2xl"
        style={{ width: 390, height: 844 }}
      >
        <div className="bg-white rounded-xl w-full h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}