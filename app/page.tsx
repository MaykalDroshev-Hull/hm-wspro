import Link from 'next/link'

export default function RootPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
          H&M Website Provisioning
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose your preferred language to continue
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/en"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 text-white font-medium rounded-lg hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-all duration-300 hover:from-purple-400 hover:to-blue-400 dark:hover:from-purple-500 dark:hover:to-blue-500"
          >
            🇺🇸 English
          </Link>
          
          <Link 
            href="/bg"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-600 dark:to-blue-600 text-white font-medium rounded-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 hover:from-cyan-400 hover:to-blue-400 dark:hover:from-cyan-500 dark:hover:to-blue-500"
          >
            🇧🇬 Български
          </Link>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Professional website development services - Fast and modern websites
        </p>
      </div>
    </div>
  )
}
