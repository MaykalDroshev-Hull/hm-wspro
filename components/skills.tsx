"use client"

import type React from "react"

import { useState } from "react"
import { Code2, Database, Layers, Palette, Server, Zap, Database as DatabaseIcon, FileCode, Globe2, CreditCard } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
          {t("skills.title")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <SkillTile
            icon={<Code2 className="h-8 w-8" />}
            name="JavaScript"
            color="from-yellow-400 to-amber-400 dark:from-yellow-500 dark:to-amber-500"
            description={t("skills.javascript")}
          />
          <SkillTile
            icon={<FileCode className="h-8 w-8" />}
            name="TypeScript"
            color="from-blue-400 to-indigo-400 dark:from-blue-500 dark:to-indigo-500"
            description={t("skills.typescript")}
          />
          <SkillTile
            icon={<Zap className="h-8 w-8" />}
            name="Vercel"
            color="from-black to-gray-600 dark:from-white dark:to-gray-400"
            description={t("skills.vercel")}
          />
          <SkillTile
            icon={<DatabaseIcon className="h-8 w-8" />}
            name="Supabase"
            color="from-green-400 to-emerald-400 dark:from-green-500 dark:to-emerald-500"
            description={t("skills.supabase")}
          />
          <SkillTile
            icon={<CreditCard className="h-8 w-8" />}
            name="Stripe"
            color="from-indigo-400 to-purple-400 dark:from-indigo-500 dark:to-purple-500"
            description={t("skills.stripe")}
          />
          <SkillTile
            icon={<Code2 className="h-8 w-8" />}
            name="C#"
            color="from-purple-400 to-violet-400 dark:from-purple-500 dark:to-violet-500"
            description={t("skills.csharp")}
          />
          <SkillTile
            icon={<Globe2 className="h-8 w-8" />}
            name="Java"
            color="from-orange-400 to-red-400 dark:from-orange-500 dark:to-red-500"
            description={t("skills.java")}
          />
          <SkillTile
            icon={<Database className="h-8 w-8" />}
            name="T-SQL"
            color="from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500"
            description={t("skills.tsql")}
          />
          <SkillTile
            icon={<Layers className="h-8 w-8" />}
            name="Tailwind"
            color="from-cyan-400 to-blue-400 dark:from-cyan-500 dark:to-blue-500"
            description={t("skills.tailwind")}
          />
          <SkillTile
            icon={<Server className="h-8 w-8" />}
            name="REST APIs"
            color="from-purple-400 to-violet-400 dark:from-purple-500 dark:to-violet-500"
            description={t("skills.restApis")}
          />
          <SkillTile
            icon={<Palette className="h-8 w-8" />}
            name="Blender"
            color="from-orange-400 to-red-400 dark:from-orange-500 dark:to-red-500"
            description={t("skills.blender")}
          />
        </div>
      </div>
    </section>
  )
}

function SkillTile({
  icon,
  name,
  color,
  description,
}: {
  icon: React.ReactNode
  name: string
  color: string
  description: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-lg opacity-50 group-hover:opacity-100 blur transition duration-300`}
      ></div>
      <div className="relative flex flex-col items-center justify-center p-6 bg-card/80 backdrop-blur-sm rounded-lg h-full transition-all duration-300 group-hover:transform group-hover:scale-105">
        <div className="text-card-foreground mb-3">{icon}</div>
        <h3 className="font-medium text-card-foreground">{name}</h3>

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/95 rounded-lg p-4 transition-opacity duration-300">
            <p className="text-sm text-center text-muted-foreground">{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
