import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  User,
  Layers,
  ChevronRight,
  ChevronDown,
  List
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

interface ProjectDetailProps {
  title: string;
  description: string;
  category: string;
  status: string;
  technologies: string[];
  content: string;
  HtmlContent?: string;
  ContentComponent?: React.FC;
  thumbnail?: string;
  date?: string;
  author?: string;
  resources?: {
    demo?: string;
    github?: string;
    docs?: string;
  };
  toc?: { id: string; text: string; level: number }[];
}

export default function ProjectDetail({
  title,
  description,
  category,
  status,
  technologies,
  content,
  HtmlContent,
  thumbnail,
  date,
  author,
  resources,
  toc = []
}: ProjectDetailProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isTocExpanded, setIsTocExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const statusStyles = {
    Active: 'text-green-700 border-green-200 bg-green-50',
    Completed: 'text-blue-700 border-blue-200 bg-blue-50',
    Ongoing: 'text-orange-700 border-orange-200 bg-orange-50',
    Planning: 'text-yellow-700 border-yellow-200 bg-yellow-50',
  };

 
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        if (toc.length > 0) setActiveId(toc[toc.length - 1].id);
        return;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0% -70% 0%' }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toc, HtmlContent]);

  return (
    <div className="bg-background selection:bg-primary/10 font-sans">

      <section className="relative py-16 md:py-24 bg-gradient-subtle border-b border-slate-200/40 dark:border-slate-800/40 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-start mb-8">
              <Link
                to="/projects"
                className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Link>
            </div>


            <div className="max-w-4xl text-left">

              <div className="flex flex-wrap justify-start gap-3 mb-6">
                {category && (
                  <Badge variant="secondary" className="px-3 py-1 text-sm bg-white/50 backdrop-blur border-muted-foreground/20 text-slate-700 dark:text-slate-300">
                    {category}
                  </Badge>
                )}
                {status && (
                <Badge
                  variant="outline"
                  className={px-3 py-1 text-sm ${
                    statusStyles[status as keyof typeof statusStyles] ||
                    'text-slate-600 border-slate-200 bg-slate-50'
                  }}
                >          {status}
                </Badge>
                )}
              </div>


              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground leading-[1.1] text-balance">
                {title}
              </h1>

              <p className={text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl ${(author || date) ? 'mb-8' : 'mb-0'
                }}>
                {description}
              </p>

              {(author || date) && (

                <div className="flex flex-wrap items-center justify-start gap-x-8 gap-y-4 text-sm text-muted-foreground font-medium">
                  {author && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span>{author}</span>
                    </div>
                  )}
                  {date && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <span>{date}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">


          <motion.div
            className="order-3 lg:order-1 lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {thumbnail && (
              <div className="rounded-xl overflow-hidden shadow-lg border mb-10 bg-muted aspect-video relative">
                <img src={thumbnail} alt={title} className="object-cover w-full h-full" />
              </div>
            )}

            <article className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none 
              prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-8
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-800 prose-h2:scroll-mt-28
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:scroll-mt-28
              prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:max-w-[65ch]
              prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:my-2 prose-li:max-w-[65ch]
              prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400
              prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-slate-100 dark:prose-img:border-slate-800
              prose-hr:border-slate-200 dark:prose-hr:border-slate-800 prose-hr:my-12
              prose-ul:list-disc prose-ul:pl-6
              prose-ol:list-decimal prose-ol:pl-6"
            >
              {HtmlContent ? (
                <div
                  dangerouslySetInnerHTML={{ __html: HtmlContent }}
                />
              ) : (
                <article>
                  <ReactMarkdown>
                    {content}
                  </ReactMarkdown>
                </article>
              )}
            </article>
          </motion.div>

          <div className="contents lg:flex lg:flex-col lg:col-span-4 lg:order-2 lg:space-y-12">
            {/* Project Info (Order 1 on Mobile) */}
            <motion.aside
              className="order-1 lg:order-none"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-none shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 overflow-hidden mb-6 lg:mb-0">
                <CardHeader className="pb-3 px-3">
                  <CardTitle className="text-lg flex items-center gap-2 font-bold tracking-tight">
                    <Layers className="w-5 h-5 text-primary" />
                    Project Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 px-3 pb-6 mt-2">
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-tight mb-3">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="font-medium bg-secondary/50 hover:bg-secondary text-slate-700 dark:text-slate-300 text-[11px] px-2.5 py-0.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.aside>

            {/* Table of Contents  */}
            {toc && toc.length > 0 && (
              <motion.div
                className="order-2 lg:order-none lg:flex-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="lg:sticky lg:top-24 px-2">
                  {/* Mobile Accordion Header */}
                  <button
                    onClick={() => setIsTocExpanded(!isTocExpanded)}
                    className="w-full lg:hidden flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-slate-200 dark:border-slate-800 mb-4 transition-colors hover:bg-muted"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <List className="w-4 h-4" />
                      <span className="text-sm font-bold uppercase tracking-tight">On This Page</span>
                    </div>
                    <ChevronDown className={w-4 h-4 transition-transform duration-300 ${isTocExpanded ? 'rotate-180' : ''}} />
                  </button>

                  {/* Desktop Header */}
                  <div className="hidden lg:flex items-center gap-2 mb-6 text-muted-foreground/80">
                    <div className="w-0.5 h-4 bg-primary/60 rounded-full" />
                    <h3 className="text-xs font-bold uppercase tracking-tight">
                      On This Page
                    </h3>
                  </div>

                  {/* Content Container */}
                  <motion.div
                    initial={false}
                    animate={isMobile ? { height: isTocExpanded ? 'auto' : 0, opacity: isTocExpanded ? 1 : 0 } : { height: 'auto', opacity: 1 }}
                    className={overflow-hidden lg:!h-auto lg:!opacity-100}
                  >
                    <nav className="relative md:ml-2">
                      <div className="absolute left-[9px] top-2 bottom-2 w-[1px] bg-border/50" />

                      <ul className="space-y-1 relative">
                        {toc.map((item) => {
                          const isActive = activeId === item.id;
                          return (
                            <li key={item.id}>
                              <a
                                href={#${item.id}}
                                onClick={() => isMobile && setIsTocExpanded(false)}
                                className={group flex items-center py-2 transition-all duration-300 ${isActive
                                  ? 'text-primary'
                                  : 'text-muted-foreground hover:text-foreground'
                                  }}
                              >
                                <div className="relative flex items-center justify-center w-5 mr-3">
                                  <div className={w-1.5 h-1.5 rounded-full border-2 border-background transition-all duration-300 ${isActive
                                    ? 'bg-primary scale-125 ring-4 ring-primary/10'
                                    : 'bg-border scale-100 group-hover:bg-muted-foreground'
                                    }}
                                  />
                                </div>

                                <span className={text-[13px] transition-all duration-300 ${isActive
                                  ? 'font-bold translate-x-1'
                                  : 'font-medium translate-x-0'
                                  } ${item.level === 3 ? 'ml-2 opacity-70' : ''}}
                                >
                                  {item.text}
                                </span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>

                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        isMobile && setIsTocExpanded(false);
                      }}
                      className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 hover:text-primary transition-colors group"
                    >
                      <ChevronDown className="w-3 h-3 rotate-180 group-hover:-translate-y-1 transition-transform" />
                      Scroll to Top
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


