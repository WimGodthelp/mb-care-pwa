import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function App(){
  const [tab,setTab]=useState('today')
  const [showPhone,setShowPhone]=useState(true)
  const [weight,setWeight]=useState(74.5)
  const [goal,setGoal]=useState('-1.0 kg deze week, 8.000+ stappen/dag')
  const [kcalIn,setKcalIn]=useState(1650)
  const [kcalOut,setKcalOut]=useState(450)
  const [steps,setSteps]=useState(9200)
  const [notes,setNotes]=useState('Voelde me energiek, training A volbracht.')
  const [contentChecks,setContentChecks]=useState({photo:false,workout:false,meal:false,vlog:false})
  const [allergies,setAllergies]=useState({glutenfree:false,lactose:false,nuts:false,egg:false,fish:false})
  const [diet,setDiet]=useState('regular')
  const [media,setMedia]=useState<any[]>([])

  const BRAND={name:'MB Care',colors:{blue:'#1E5E82',pink:'#F24393',pink2:'#FF6FB2'},whatsapp:{number:'31648197794',message:encodeURIComponent('Hoi coach! Ik heb een vraag over mijn voortgang.')}}

  function toggle(key:string){setContentChecks(s=>({...s,[key]:!s[key]}))}
  function onAddMedia(files:FileList|null){
    const items=Array.from(files||[]).slice(0,10).map((f:any)=>({
      id:Math.random().toString(36).slice(2),
      type:f.type.startsWith('video')?'video':'image',
      url:URL.createObjectURL(f),
      name:f.name,
      date:new Date().toISOString(),
      ai:null
    }))
    setMedia(m=>[...items,...m])
  }
  async function analyzeMeal(id:string){
    const demo={items:[{name:'kipfilet',portion:'150 g',kcal:165},{name:'broccoli',portion:'200 g',kcal:70},{name:'zilvervliesrijst',portion:'50 g droog',kcal:180}],totalKcal:415}
    await new Promise(r=>setTimeout(r,500))
    setMedia(ms=>ms.map(m=>m.id===id?{...m,ai:demo}:m))
  }
  const weekData=[{w:'W1',kg:74.5},{w:'W2',kg:73.6},{w:'W3',kg:72.9},{w:'W4',kg:72.1}]
  const Frame=({children}:{children:any})=> (<div className="w-full flex justify-center"><div className="relative bg-black rounded-2xl p-3 shadow-2xl" style={{width:390,height:844}}><div className="bg-white rounded-xl w-full h-full overflow-auto">{children}</div></div></div>)

  const AppShell=(
    <div className="min-h-full bg-white text-gray-900">
      <div className="p-4 space-y-4">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 100 100" aria-label="MB Care"><defs><linearGradient id="mbPink" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={BRAND.colors.pink}/><stop offset="100%" stopColor={BRAND.colors.pink2}/></linearGradient></defs><rect rx="20" ry="20" width="100" height="100" fill="url(#mbPink)"/><text x="50" y="58" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="46" fontWeight="800" fill="#fff">MB</text></svg>
            <h1 className="text-xl" style={{color:BRAND.colors.blue}}>Care • Coach</h1>
          </div>
          <div className="text-xs" style={{color:BRAND.colors.blue}}>Demo</div>
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
            <Card><CardContent>
              <div className="flex items-center gap-2"><span>📝</span><h2>Dagboek (vandaag)</h2></div>
              <div class
