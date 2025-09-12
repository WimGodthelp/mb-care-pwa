import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

export default function Home() {
  const [tab, setTab] = useState("today");
  const [kcalIn, setKcalIn] = useState(1650);
  const [kcalOut, setKcalOut] = useState(450);
  const [steps, setSteps] = useState(9200);
  const [weight, setWeight] = useState(74.5);
  const [notes, setNotes] = useState("");
  const [content, setContent] = useState({ photo:false, workout:false, meal:false, vlog:false });

  const BRAND = { blue:"#1E5E82", pink:"#F24393", pink2:"#FF6FB2" };
  const weekData = [{w:"W1",kg:74.5},{w:"W2",kg:73.6},{w:"W3",kg:72.9},{w:"W4",kg:72.1}];

  return (
    <div className="p-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 100 100" aria-label="MB Care">
            <defs><linearGradient id="mbPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={BRAND.pink}/><stop offset="100%" stopColor={BRAND.pink2}/>
            </linearGradient></defs>
            <rect rx="20" ry="20" width="100" height="100" fill="url(#mbPink)"/>
            <text x="50" y="58" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="46" fontWeight={800} fill="#fff">MB</text>
          </svg>
          <h1 style={{color:BRAND.blue}}>Care • Coach</h1>
        </div>
        <span className="text-gray-500 text-sm">Demo</span>
      </header>

      <Tabs defaultValue="today" value={tab} onValueChange={setTab} className="grid gap-3">
        <TabsList className="grid grid-cols-4 gap-2">
          <TabsTrigger value="today">Dagboek</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="setup">Instellen</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="grid gap-3">
          <Card><CardContent>
            <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:".75rem"}}>
              <div><Label>Voeding (kcal)</Label><Input type="number" value={kcalIn} onChange={(e:any)=>setKcalIn(parseInt(e.target.value||"0",10))}/></div>
              <div><Label>Verbrande (kcal)</Label><Input type="number" value={kcalOut} onChange={(e:any)=>setKcalOut(parseInt(e.target.value||"0",10))}/></div>
              <div><Label>Stappen</Label><Input type="number" value={steps} onChange={(e:any)=>setSteps(parseInt(e.target.value||"0",10))}/></div>
              <div><Label>Gewicht (kg)</Label><Input type="number" step={0.1} value={weight} onChange={(e:any)=>setWeight(parseFloat(e.target.value||"0"))}/></div>
            </div>
            <div className="grid gap-2">
              <Label>Opmerkingen</Label>
              <textarea className="border rounded-xl p-4" style={{minHeight:80}} value={notes} onChange={(e)=>setNotes(e.target.value)}/>
            </div>
            <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:".5rem", marginTop:8}}>
              <label className="flex items-center gap-2"><Checkbox checked={content.photo} onCheckedChange={()=>setContent(s=>({...s,photo:!s.photo}))}/> Foto update</label>
              <label className="flex items-center gap-2"><Checkbox checked={content.workout} onCheckedChange={()=>setContent(s=>({...s,workout:!s.workout}))}/> Workout-clip</label>
              <label className="flex items-center gap-2"><Checkbox checked={content.meal} onCheckedChange={()=>setContent(s=>({...s,meal:!s.meal}))}/> Maaltijdfoto</label>
              <label className="flex items-center gap-2"><Checkbox checked={content.vlog} onCheckedChange={()=>setContent(s=>({...s,vlog:!s.vlog}))}/> Mini-vlog/quote</label>
            </div>
          </CardContent></Card>

          <Card><CardContent>
            <div style={{width:"100%",height:160}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weekData}><XAxis dataKey="w"/><YAxis domain={[70,76]}/><Tooltip/><Line type="monotone" dataKey="kg" strokeWidth={3} dot/></LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="week" className="grid gap-3">
          <Card><CardContent>
            <h3>Kcal balans</h3>
            <div style={{width:"100%",height:160}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{label:"In",v:kcalIn},{label:"Uit",v:kcalOut}]}><XAxis dataKey="label"/><YAxis/><Tooltip/><Bar dataKey="v"/></BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="media"><Card><CardContent>🚧 Media upload komt in de volgende iteratie.</CardContent></Card></TabsContent>
        <TabsContent value="setup"><Card><CardContent>🚧 Instellingen (allergieën/voorkeuren) komen hier.</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
