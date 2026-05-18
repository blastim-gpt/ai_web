/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Gift } from "lucide-react";
import React, { useState } from "react";

const Section = ({ children, className = "", id = "", dark = false }: { children: React.ReactNode; className?: string; id?: string; dark?: boolean }) => (
  <motion.section 
    id={id} 
    initial={{ opacity: 0, y: 80 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`min-h-screen py-24 px-4 md:px-10 lg:px-20 border-b-2 ${dark ? 'bg-term-black text-white border-white/10 dark-section' : 'bg-white text-term-black border-term-black'} relative ${className}`}
  >
    {children}
  </motion.section>
);

const Card = ({ children, className = "", delay = 0, dark = false, onClick }: { children: React.ReactNode; className?: string; delay?: number; dark?: boolean; key?: React.Key; onClick?: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className={`terminal-border p-6 ${dark ? 'bg-white/5 border-white/20' : 'bg-white border-term-black'} mb-6 ${className}`}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

const Headline = ({ title, subtitle, dark = false }: { title: string; subtitle?: string; dark?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="mb-12 font-mono"
  >
    <div className={`${dark ? 'text-term-green/80' : 'text-term-green'} mb-1 uppercase tracking-widest text-xs`}>
      {`[ SESSION: ${subtitle || "ROOT"} ]`}
    </div>
    <h2 className={`text-4xl md:text-6xl font-bold ${dark ? 'text-white' : 'text-term-black'}`}>
      {`> ${title}`}
      <span className="cursor-blink ml-1">_</span>
    </h2>
  </motion.div>
);

const ASCII = {
  computer: `
   _________________
  |  _____________  |
  | |             | |
  | |   >_READY   | |
  | |_____________| |
  |_________________|
         |   |
      ___|___|___
     |___________|`,
  mole: `
       _   _
      (q\\_/p)
       (o o)
       =\\_/=
       /   \\
      /     \\_
      \\_____/ `,
  typewriter: `
      .-------.
     /   ___   \\
     |  |   |  |
     |  '---'  |
     '---------'
     / ======= \\
    /___________\\`,
  grandma: `
      @@@@@@@
     @ (o o) @
     @   ^   @
      @ @@@ @
       @@@@@
     &#######&
     &#######&`,
  calendar: `
    _________
   | DEC ^^^ |
   | [6][6]  |
   | [6][6]  |
   | [6][6]  |
   |_________|`,
  professor: `
      .----.
     / @  @ \\
    |    ^   |
     \\  '-' /
     /|____|\\
    / |    | \\`,
  mole: `
    (  o  o  )
   (    --    )
    (  vvvv  )
     (______)`
};

const AsciiGraphic = ({ type, className = "", delay = 0 }: { type: keyof typeof ASCII; className?: string; delay?: number }) => (
  <motion.pre
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 0.7, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`font-mono text-[9px] leading-[1.1] pointer-events-none select-none absolute z-0 ${className}`}
  >
    {ASCII[type]}
  </motion.pre>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMitModalOpen, setIsMitModalOpen] = useState(false);
  const [isBabbageModalOpen, setIsBabbageModalOpen] = useState(false);

  const faq = [
    { 
      q: "Какие модели использовать для проверки задач по математике?", 
      a: (
        <div className="space-y-4">
          <p>Для математики существует специальный инструмент — <strong>Lean</strong>. Это язык программирования, в который встроен ИИ.</p>
          <div className="p-3 terminal-border border-dashed bg-term-green/5 font-mono text-[10px]">
            {`[ ORCHESTRATION_LAYER ]`}
            <div className="mt-2 text-term-green">
              {`> Theorem_Proving: OK`}<br/>
              {`> Equation_Derivation: OK`}<br/>
              {`> Logic_Verification: OK`}
            </div>
          </div>
          <p>Lean позволяет математикам разделять задачу на части и работать в коллаборации. Главное — не модель (ChatGPT, Claude), а инструкции и оркестрация агентов. И помните про Зевса: не забывайте детали безопасности.</p>
        </div>
      )
    },
    { 
      q: "Оптимальное использование нейросетей, промпты и советы.", 
      a: (
        <div className="space-y-4">
          <p>Самый неочевидный совет: не так важна модель, главное — <strong>промпт</strong> и то, как вы его пишете.</p>
          <div className="flex gap-2">
            <div className="flex-1 p-2 terminal-border bg-white/5 border-white/20 text-[10px] font-mono">
              <span className="text-term-red">BAD:</span> "Реши задачу за меня"
            </div>
            <div className="flex-1 p-2 terminal-border border-term-green bg-term-green/10 text-[10px] font-mono">
              <span className="text-term-green">GOOD:</span> "Проверь решение и сам найди доп. информацию"
            </div>
          </div>
          <p>Главное — автоматизация. Пишите промпты так, чтобы ваше участие больше не требовалось.</p>
        </div>
      )
    },
    { 
      q: "Безопасность неопубликованных данных.", 
      a: (
        <div className="space-y-4">
          <p>Ответ и да, и нет. В ChatGPT/Claude данные остаются приватными (модель учится, но не разглашает), но всегда есть риск утечки при взломе.</p>
          <div className="p-4 border-2 border-term-red bg-term-red/5">
             <p className="text-xs font-bold uppercase text-term-red mb-2">{`SOLUTION: LOCAL_MODELS`}</p>
             <p className="text-xs">Запуск на собственном ноутбуке = 100% контроль данных без подписок.</p>
          </div>
        </div>
      )
    },
    { 
      q: "Получается, что промпты важнее обучения?", 
      a: (
        <div className="space-y-4">
          <p>Обучение — это миллиарды долларов. Но промпт — это "обучение внутри контекста".</p>
          <div className="p-3 terminal-border font-mono text-[10px] bg-white/5 border-white/20">
            {`$ train_cost = $1,000,000,000`}<br/>
            {`$ prompt_context = "Deep understanding in seconds"`}
          </div>
          <p>Модель понимает, что происходит, и обучается прямо во время диалога.</p>
        </div>
      )
    },
    { 
      q: "Есть ли файл с инструкцией для любой задачи?", 
      a: (
        <div className="space-y-4">
          <p>Файлы постоянно устаревают. Главное — выучить <strong>принципы</strong>:</p>
          <ol className="list-decimal list-inside text-xs space-y-2 opacity-80">
            <li>Чётко указывать, что именно нужно.</li>
            <li>Предоставлять весь необходимый контекст.</li>
          </ol>
        </div>
      )
    },
    { 
      q: "Какую среду для агентов рекомендуете?", 
      a: (
        <div className="space-y-4">
          <p>Постоянно работающие агенты стоят денег. Лектор рекомендует использовать <strong>Python</strong> для создания систем.</p>
          <div className="p-3 terminal-border border-dashed font-mono text-[10px]">
            {`[ CLAUDE_CODE: LOOP/GOAL ]`}<br/>
            {`[ OPENCLAW: GAME_AI ]`}
          </div>
          <p>На курсе разбирают оркестрацию, где один агент управляет другими по порядку.</p>
        </div>
      )
    },
    { 
      q: "Что такое E-агент и чем он поможет?", 
      a: (
        <div className="space-y-4 flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 terminal-border flex items-center justify-center font-bold text-xl">E</div>
          <div>
            <p>Это секретарь с уровнем Нобелевского лауреата. Любая рутина за компьютером (таблицы, документы, заполнение форм) может быть автоматизирована.</p>
          </div>
        </div>
      )
    },
    { 
      q: "Можно ли писать обзорные статьи и публиковать их?", 
      a: (
        <div className="space-y-4">
          <p className="text-xl font-bold text-term-green">ДА.</p>
          <p>Примерно 90-95% современных статей пишутся с помощью ИИ. Это легко заметить по резкому росту качества английского языка в публикациях.</p>
        </div>
      )
    },
    { 
      q: "Задания для студентов, которые ИИ не решит?", 
      a: (
        <div className="space-y-4">
          <p>ИИ может решить почти всё. Решение — вопросы без готовых ответов (уровня Нобелевки) или экзамен без техники.</p>
          <div className="p-4 bg-white/5 border border-white/20 font-mono text-[10px]">
            {`[ GPS_PARADOX ]`}<br/>
            <p className="mt-2 opacity-60 italic text-white/70">Таксисты раньше помнили весь город, теперь только карту. Мы не должны терять навык мышления, отдавая его ИИ.</p>
          </div>
        </div>
      )
    },
    { 
      q: "Прогнозы: когда появится сильный ИИ (AGI)?", 
      a: (
        <div className="space-y-4">
          <p className="font-bold">Лектор считает, что AGI уже здесь.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="terminal-border p-3 text-center">
              <div className="text-xs opacity-50 uppercase">Next 5 Years</div>
              <div className="text-xl font-bold">1000x</div>
              <div className="text-[8px]">Faster & Cheaper</div>
            </div>
            <div className="terminal-border p-3 text-center border-term-green">
              <div className="text-xs opacity-50 uppercase">Industry</div>
              <div className="text-xl font-bold">90%</div>
              <div className="text-[8px]">Devs use AI</div>
            </div>
          </div>
          <p className="text-xs opacity-80">Задача — научиться этим пользоваться, пока мир ускоряется в 100 раз каждые два года.</p>
        </div>
      )
    },
    { 
      q: "Насколько эффективно назначение роли?", 
      a: (
        <div className="space-y-4">
          <p>Очень эффективно для тона и стиля. Метод "профессора":</p>
          <div className="italic p-3 terminal-border bg-white/5 border-white/20 italic text-sm text-term-green">
            «Представь, что ты профессор (который отлично объясняет)...»
          </div>
          <p>Модель будет объяснять материал приятно и понятно.</p>
        </div>
      )
    },
    { 
      q: "Робототехника и вайб-кодинг.", 
      a: (
        <div className="space-y-4">
          <p>В мире производится 2 млн роботов в год. Главный навык — давать им правильные задачи.</p>
          <div className="p-4 border-2 border-term-red bg-term-red/10 font-mono text-[10px]">
            {`[ WARNING: TALOS_SAFETY ]`}<br/>
            {`Помните про Зевса, который забыл про безопасность, создавая своего Талоса.`}
          </div>
        </div>
      )
    },
    {
      q: "Как лучше всего оформить запрос?",
      a: (
        <div className="space-y-4">
          <p>Используйте структуру <strong>ROLE + TASK + CONTEXT + FORMAT</strong>.</p>
          <div className="terminal-border p-4 bg-white/5 border-dashed border-white/20">
             <p className="text-xs italic opacity-80">«Ты эксперт в [ОБЛАСТЬ]. Твоя задача [ЗАДАЧА]. Используй данные из [КОНТЕКСТ]. Выдай результат в виде [ФОРМАТ].»</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white text-term-black font-sans">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-term-green z-[100] origin-left" style={{ scaleX }} />

      {/* Hero Section */}
      <Section className="flex flex-col justify-center overflow-hidden">
        <AsciiGraphic type="computer" className="top-40 right-10 text-term-green/60 scale-150 rotate-12" delay={0.2} />
        <AsciiGraphic type="typewriter" className="bottom-20 left-10 text-term-red/50 scale-125 -rotate-12" delay={0.4} />
        <div className="max-w-5xl relative">
          <div className="text-term-green font-mono mb-6 text-sm">
            {`$ cat intro_meta.txt`}
          </div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-8"
          >
            ИИ СО СКОРОСТЬЮ <br />
            <span className="text-term-green">СВЕТА</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mb-12 border-l-4 border-term-black pl-6 py-2"
          >
            <p className="text-xl md:text-2xl font-bold mb-4">
              Вебинар организован в рамках курса «ИИ в научной работе».
            </p>
            <p className="text-lg opacity-80">
              Узнайте, как автоматизировать исследования и заглянуть в будущее технологий.
            </p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-6 font-mono">
            <a href="https://agency.blastim.ru/scientist_of_the_future" target="_blank" className="terminal-border bg-term-green text-white font-bold py-4 px-10 hover:bg-white hover:text-term-green transition-all text-center">
              {`RUN: JOIN_NOW`}
            </a>
            <a href="#intro" className="terminal-border text-term-black font-bold py-4 px-10 hover:bg-term-black hover:text-white transition-all text-center">
              {`DIR: CONTENT`}
            </a>
          </div>
          
          <div className="mt-20 font-mono text-term-green animate-pulse">
            {`bash: waiting for input...`}
            <span className="cursor-blink">_</span>
          </div>
        </div>
      </Section>

      {/* Introduction Section */}
      <Section id="intro">
        <AsciiGraphic type="computer" className="top-10 right-10 text-term-green" delay={0.5} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Headline title="Вступление" subtitle="Твой новый инструмент" />
            <div className="space-y-6">
              <p className="text-2xl font-bold leading-tight">
                ИИ уже работает у ваших коллег. Теперь он может работать на вас.
              </p>
              <p className="opacity-80 text-lg leading-relaxed">
                Вы можете продолжать всё делать вручную. А можете уже завтра: сократить рутину, ускорить анализ и выйти на новый уровень продуктивности.
              </p>
            </div>
          </motion.div>
          <div className="space-y-6">
            <Headline title="О лекторе" subtitle="Александр Декан" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-full md:w-48 h-64 md:h-64 shrink-0 terminal-border overflow-hidden"
              >
                <img 
                   src="https://blastim.ru/wp-content/uploads/2026/05/dekan_.png" 
                   alt="Александр Декан"
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="flex-1 space-y-6">
                <Card delay={0.2} className="border-l-8 border-l-term-green">
                  <h4 className="font-mono font-bold uppercase tracking-tight text-term-green mb-2">{`> OpenAI_Experience`}</h4>
                  <p className="text-sm">Занимался разработкой датасета для ChatGPT 4.0.1 — первой модели с функцией размышлений.</p>
                </Card>
                <Card delay={0.3} className="border-l-8 border-l-term-red">
                  <h4 className="font-mono font-bold uppercase tracking-tight text-term-red mb-2">{`> Anti-Aging_AI`}</h4>
                  <p className="text-sm">В аспирантуре по ИИ для лечения старения. Цель — чтобы люди жили долго и имели меньше болезней.</p>
                </Card>
                <p className="italic opacity-60 text-sm">
                  "Я уверен, что любое применение ИИ важно."
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Agenda Section */}
      <Section className="overflow-hidden">
        <AsciiGraphic type="typewriter" className="top-10 left-10 opacity-5 -rotate-6" delay={0.1} />
        <Headline title="План встречи" subtitle="Ключевые темы" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { t: "История", d: "Развитие ИИ от древних греков до современности.", step: "01" },
            { t: "Состояние", d: "Что ИИ умеет сейчас и прогнозы на 5-10 лет.", step: "02" },
            { t: "Практика", d: "Ответы на вопросы и реальные научные кейсы.", step: "03" }
          ].map((item, i) => (
            <Card key={i} delay={i * 0.1} className="flex flex-col h-full border-2">
              <div className="font-mono text-xs text-term-green mb-4">{`STEP_${item.step}`}</div>
              <h3 className="text-2xl font-bold uppercase mb-4">{item.t}</h3>
              <p className="opacity-70 leading-relaxed text-sm">{item.d}</p>
              <div className="mt-auto pt-6 text-term-green font-mono text-xs">
                {`STATUS: PENDING...`}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* History: Talos Section */}
      <Section>
        <AsciiGraphic type="mole" className="top-20 right-10 opacity-10 rotate-12" delay={0.2} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Headline title="Первый ИИ" subtitle="Древняя Греция" />
            <Card className="border-l-8 border-l-term-red">
              <h3 className="text-3xl font-bold mb-6 uppercase italic">ТАЛОС (~800 лет до н.э.)</h3>
              <p className="text-lg opacity-80 leading-relaxed mb-6">
                 Искусственный интеллект придумали древние греки. Первый известный робот — Талос, которому давал команды сам Зевс, защищал остров Крит от варваров. Промт-инжиниринг существует уже 2800 лет.
              </p>
              <div className="p-6 border-t-2 border-term-black bg-slate-50">
                <p className="text-xs font-mono font-bold uppercase mb-4 text-term-red">{`[ DIRECTIVES: AUTO_EXEC ]`}</p>
                <ul className="space-y-4 font-mono text-sm">
                  <li>{`> Охрана границ: трижды в день обегать остров...`}</li>
                  <li>{`> Защита: не подпускать корабли, швырять камни...`}</li>
                  <li>{`> Законы: следить за порядком, таблицы Зевса...`}</li>
                </ul>
              </div>
            </Card>
          </div>
          <div className="space-y-8">
            <div className="terminal-border p-8 border-term-red bg-term-red/5">
              <h3 className="text-xl font-bold mb-4 uppercase text-term-red tracking-tighter">
                {`WARNING: PROMPT_INJECTION_DETECTED`}
              </h3>
              <p className="opacity-80 leading-relaxed italic mb-6">
                Древние греки победили Талоса через взлом промпта. Медея использовала "духов смерти" (вредоносный ввод), который вызвал панику у гиганта.
              </p>
              <div className="p-4 bg-term-red text-white font-mono font-bold uppercase text-xs mb-4">
                {`SYSTEM ERROR: FIRST_AI_BREACH_800_BC`}
              </div>
              <p className="text-xs opacity-60 leading-relaxed">
                Сегодняшние джейлбрейки (Grok, ChatGPT) работают аналогично: обход фильтров через специфические паттерны ввода.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Facts Section */}
      <Section className="overflow-hidden">
        <AsciiGraphic type="mole" className="top-10 left-10 text-term-green" delay={0.1} />
        <Headline title="Интересные факты" subtitle="Психология систем" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <div className="terminal-border p-8 border-l-8 border-l-term-green bg-white relative overflow-hidden group">
            <AsciiGraphic type="grandma" className="bottom-0 right-0 text-term-green/20 group-hover:opacity-40 transition-opacity" delay={0.2} />
            <h3 className="text-2xl font-bold mb-4 font-mono uppercase relative z-10">{`> Problem_100_Grandmas`}</h3>
            <p className="opacity-80 leading-relaxed italic mb-6 relative z-10">
              Раньше ChatGPT работал лучше, если ему угрожали смертью 100 бабушек. Это работало за счет специфики обучения на текстовых данных.
            </p>
            <div className="text-xs font-mono text-term-green relative z-10">{`FIXED: MODEL_PATCH_v4.5`}</div>
          </div>
          <div className="terminal-border p-8 border-l-8 border-l-term-red bg-white relative overflow-hidden group">
            <AsciiGraphic type="calendar" className="top-0 right-0 text-term-red/20 group-hover:opacity-40 transition-opacity" delay={0.4} />
            <h3 className="text-2xl font-bold mb-4 font-mono uppercase relative z-10">{`> December_Effect`}</h3>
            <p className="opacity-80 leading-relaxed italic mb-6 relative z-10">
              В декабре ИИ выдавал ответы короче — он "думал", что сейчас праздники и можно отдыхать. "Лень" была обучена через календарный контекст.
            </p>
            <div className="text-xs font-mono text-term-red relative z-10">{`STATUS: RESOLVED`}</div>
          </div>
        </div>
      </Section>

      {/* Computing History & Types */}
      <Section>
        <Headline title="Эволюция устройств" subtitle="История технологий" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold uppercase italic border-b-2 border-term-black pb-4">Путь к думающей машине</h3>
            <p className="opacity-80 leading-relaxed">
              Человечество развивалось: появились паровые двигатели, поезда, механизмы. Люди поняли, что с помощью логики и арифметики можно создать машину, которая будет делать предсказания и даже думать.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-t-4 border-t-term-green cursor-pointer hover:bg-slate-50 transition-colors group" onClick={() => setIsBabbageModalOpen(true)}>
                <h4 className="font-bold mb-2 font-mono uppercase text-sm flex justify-between items-center">
                  <span>Бэббидж и Ада</span>
                  <span className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity">[{`📜 READ_MORE`}]</span>
                </h4>
                <p className="text-xs opacity-60">
                  XIX век. Первая машина и первая программистка. Идея машины, которая может считать.
                </p>
              </Card>
              <Card className="border-t-4 border-t-term-red cursor-pointer hover:bg-slate-50 transition-colors group" onClick={() => setIsMitModalOpen(true)}>
                <h4 className="font-bold mb-2 font-mono uppercase text-sm flex justify-between items-center">
                  <span>1950-е: MIT</span>
                  <span className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity">[{`📜 READ_MORE`}]</span>
                </h4>
                <p className="text-xs opacity-60">
                  Первые нейросети (перцептроны). Технологии 50-х не позволили им развиться.
                </p>
              </Card>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="terminal-border p-8 bg-slate-50">
              <h3 className="text-2xl font-bold uppercase mb-6 font-mono tracking-tighter">{`[ BRANCHING_PATH: 1990s ]`}</h3>
              <div className="space-y-6 font-mono text-sm leading-tight">
                <div className="flex gap-4">
                  <span className="text-term-red">{`[ FAIL ]`}</span>
                  <p>Физ. нейросети: из проводов и узлов (сложно).</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-term-green">{`[ WIN ]`}</span>
                  <p>Логические цепи: развитие калькуляторов. Путь к смартфонам.</p>
                </div>
              </div>
              <p className="mt-8 text-xs p-4 terminal-border border-dashed">
                 {`LOG: Mobile phones now > 1990s supercomputers. We are SIMULATING brains on calculators.`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card delay={0.1} className="border-term-green bg-term-green/5 flex gap-6 items-start border-l-8">
            <div>
              <h4 className="text-xl md:text-2xl font-bold uppercase mb-4 text-term-green leading-tight break-words">{`> Calculators`}</h4>
              <p className="opacity-60 mb-4 font-mono italic text-xs">Slightly faster than light</p>
              <p className="opacity-80 text-sm leading-relaxed">
                Любое вычисление за доли секунды. Главное ограничение — скорость обработки. Видеокарты (GPU) помогают распараллеливать задачи.
              </p>
            </div>
          </Card>
          <Card delay={0.2} className="border-term-red bg-term-red/5 flex gap-6 items-start border-l-8">
            <div>
              <h4 className="text-xl md:text-2xl font-bold uppercase mb-4 text-term-red leading-tight break-words">{`> Biological_Brain`}</h4>
              <p className="opacity-60 mb-4 font-mono italic text-xs">Energy efficient benchmark</p>
              <p className="opacity-80 text-sm leading-relaxed">
                Тратит энергии как лампочка. Мозг остается «черной коробкой» — мы до сих пор не понимаем, как формируется личность.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Deep Research Section */}
      <Section dark>
        <AsciiGraphic type="mole" className="bottom-10 left-10 text-term-green" delay={0.8} />
        <div className="max-w-6xl mx-auto">
          <Headline title="Deep Research" subtitle="Эволюция алгоритмов" dark />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <p className="text-xl opacity-80 leading-relaxed font-bold">
                {`> Alpha_Evolve_with_Deep_Research`}
              </p>
              <a 
                href="https://t.me/blastim/3031" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block text-xs font-mono text-term-green hover:underline border border-term-green/30 px-2 py-1 bg-term-green/5"
              >
                {`[ READ: BLASTIM_ARTICLE ]`}
              </a>
              
              <div className="terminal-border p-8 bg-white/5 border-white/20 text-white font-mono">
                <h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-3">
                  {`[ TASK: ORCHESTRATION ]`}
                </h3>
                <ol className="space-y-6 text-sm text-slate-300">
                  <li>{`1. GENERATE: 3 solutions.`}</li>
                  <li>{`2. MEASURE: Rank quality (Top to Bottom).`}</li>
                  <li>{`3. EVOLVE: Apply pseudo-perturbations to branches.`}</li>
                  <li>{`4. PRUNE: Kill bad branches. Keep winners.`}</li>
                </ol>
              </div>
              <p className="text-sm opacity-60">
                {`"Исследователи соединили эволюцию алгоритмов с поиском по интернету."`}
              </p>
            </div>

            <div className="space-y-10">
               <Card dark delay={0.1} className="border-l-8 border-l-term-red">
                  <h3 className="text-2xl font-bold uppercase mb-4">Kissing Numbers</h3>
                  <p className="opacity-80 mb-6 italic text-sm">
                    «Человеческое решение было в 6.5 раз хуже решения ИИ. Ограничение — только в критериях оценки».
                  </p>
               </Card>

               <div className="terminal-border p-6 border-l-8 border-l-term-green overflow-hidden bg-white/5 border-green-500/20">
                  <h4 className="font-bold mb-6 font-mono uppercase text-sm border-b-2 border-white/10 pb-2">{`> Biology_Data_Integration`}</h4>
                  
                  <div className="space-y-4 text-sm leading-relaxed">
                    <div className="space-y-2">
                      <p className="font-bold uppercase tracking-tighter text-xs text-term-green">Применение метода к реальной биологической задаче</p>
                      <p className="opacity-90">
                        Исследователи применили этот метод к реальной задаче в биологии — интеграции данных.
                      </p>
                      <p className="text-xs opacity-70 italic border-l-2 border-white/20 pl-3">
                        Проблема: если две исследовательские группы (например, в Москве и Японии) изучают влияние упражнений на рост мышц, данные из разных источников сложно объединять, потому что люди в разных странах различаются по уровню здоровья, медицины, социальным взаимодействиям, спортивной активности и т.д.
                      </p>
                    </div>

                    <div className="terminal-border bg-white/10 p-2 my-4 border-white/20">
                      <img 
                        src="https://blastim.ru/wp-content/uploads/2026/05/risunok1.png" 
                        alt="График результатов" 
                        className="w-full h-auto block invert"
                        referrerPolicy="no-referrer"
                      />
                      <p className="text-[10px] font-mono mt-1 opacity-50 text-center uppercase tracking-widest">Fig. 01: Algorithm Performance Schema</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold uppercase tracking-tighter text-xs text-term-green">Результаты</p>
                      <p className="opacity-90">
                        На графике каждый столбик — новый алгоритм. Чем выше столбик, тем лучше. Человеческие решения показаны красным. Всё синее — решения, придуманные <strong>Deep Research</strong>. 
                      </p>
                      <p className="opacity-90">
                        Самое лучшее решение (синее) оказалось создано ИИ — метод <strong>BBKNN</strong> (базируется на существующем методе, модифицированном различными способами). Самое лучшее человеческое решение стало лучше примерно на 10–15%.
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 terminal-border border-dashed border-white/20 space-y-3">
                       <p className="text-xs leading-relaxed opacity-80">
                        Это звучит не слишком много, но для задачи, над которой работают тысячи людей по всему миру, улучшение на 15% — огромное число. 
                      </p>
                      <p className="text-xs leading-relaxed opacity-80">
                        Почему для «проблемы целующихся цифр» улучшение было в 6,5 раз, а для интеграции данных — всего на 10–15%? Потому что проблемой целующихся цифр занимались лишь некоторые математики в свободное время. Не было задачи решить ее идеально. А интеграция данных — известная проблема, над которой работают огромные коллективы, и улучшить существующие методы здесь крайне сложно.
                      </p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Longevity Section */}
      <Section id="longevity">
        <AsciiGraphic type="computer" className="top-1/2 right-10 text-term-green rotate-45 scale-150" delay={0.5} />
        <div className="max-w-4xl mx-auto">
          <Headline title="ИИ против старения" subtitle="Научная работа" />
          <div className="terminal-border p-12 bg-term-green/5 text-left">
            <div className="space-y-8">
              <p className="text-2xl md:text-3xl leading-relaxed italic font-bold">
                «Старением занимается всего около 10 000 человек. Нам не хватает математиков, но теперь есть Искусственный Интеллект».
              </p>
              <div className="font-mono text-sm space-y-4 text-term-green">
                <p>{`$ start search --topic=longevity`}</p>
                <p>{`$ deploy AI_DEPARTMENTS --target=biological_challenges`}</p>
              </div>
              <div className="pt-8 border-t-2 border-term-black flex items-center gap-4">
                <span className="bg-term-red text-white font-bold py-2 px-6 text-xs uppercase tracking-widest">{`OBJECTIVE: DEFEAT_TIME`}</span>
                 <AsciiGraphic type="mole" className="static text-term-green/40 scale-[2] ml-8" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" dark>
        <AsciiGraphic type="typewriter" className="bottom-1/4 left-10 text-white -rotate-12 scale-150" delay={0.3} />
        <Headline title="Вопросы участников" subtitle="База знаний" dark />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faq.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              className={`p-6 border-2 cursor-pointer transition-all ${activeFaq === i ? 'border-term-green bg-term-green/10' : 'border-white/10 hover:border-term-green bg-white/5'}`}
            >
              <div className="flex justify-between items-center font-mono">
                <h4 className="font-bold text-sm uppercase tracking-tight">{`> ${item.q}`}</h4>
                <div className={`transition-transform ${activeFaq === i ? 'rotate-90 text-term-green' : 'opacity-40'}`}>{`>>`}</div>
              </div>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t-2 border-white/10 text-sm leading-relaxed italic opacity-80">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Future Tech Section */}
      <Section dark>
        <AsciiGraphic type="typewriter" className="top-20 right-20 text-term-red rotate-12" delay={1} />
        <Headline title="Что ждёт в будущем?" subtitle="Технологический прорыв" dark />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card dark className="border-t-8 border-t-term-green p-12">
            <div className="text-4xl font-black mb-6 text-term-green font-mono tracking-tighter italic">{`[ CEREBRAS: WAFER_CHIPS ]`}</div>
            <h3 className="text-2xl font-bold mb-4 uppercase">Создание больших чипов (вафель)</h3>
            <div className="space-y-6 text-sm leading-relaxed mb-8">
              <p className="opacity-80">
                Людям нравятся калькуляторы, и они продолжают развивать этот путь. Сегодня самая дорогая видеокарта от Nvidia стоит около 8 млн руб. Компания <strong>Cerebras</strong> решила масштабировать архитектуру в 10 раз.
              </p>
              <p className="opacity-80">
                Это позволяет запускать огромные модели (вроде ChatGPT) на одной «вафле». В результате модель становится в 10 раз быстрее и дешевле, так как передача информации между элементами не тратит ресурсы на внешние шины.
              </p>
            </div>

            <div className="space-y-4 mb-10 font-mono">
               <div className="p-4 border-2 border-dashed border-white/20 bg-white/5">
                  <p className="text-xs font-bold mb-2 uppercase text-term-green">{`> CASE_STUDY: WINDOWS_GENERATION`}</p>
                  <div className="grid grid-cols-2 gap-4 text-[10px]">
                    <div>
                      <p className="opacity-50">TASK SIZE:</p>
                      <p>100M lines / 1.2B words</p>
                    </div>
                    <div>
                      <p className="opacity-50">UNIT_SPEED:</p>
                      <p>570 tokens/sec</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-[12px] font-bold text-term-green">{`RESULT: 1 DAY (with 3000 cards)`}</p>
                    <p className="text-[9px] opacity-40 mt-1">Single unit would take 3300 days.</p>
                  </div>
               </div>
               
               <p className="text-xs opacity-60 italic">
                  «Через год-два стоимость ChatGPT упадёт в 10 раз. Маленькие модели станут настолько хороши, что верхушка рынка не понадобится большинству».
               </p>
            </div>
            <div className="p-4 bg-term-green text-white font-mono text-center font-bold tracking-widest">{`chat.cerebras.ai`}</div>
          </Card>
          
          <Card dark className="border-t-8 border-t-term-red p-12">
            <div className="text-4xl font-black mb-6 text-term-red font-mono tracking-tighter italic">{`[ TALOS: PRINTED_NN ]`}</div>
            <h3 className="text-2xl font-bold mb-4 uppercase">Печать нейросетей на чипе</h3>
            <div className="space-y-6 text-sm leading-relaxed mb-8">
              <p className="opacity-80">
                Зачем симулировать нейросеть, если её можно напечатать? В таком чипе нет логических элементов — только сама нейросеть, обученная на данных.
              </p>
              <p className="opacity-80">
                Её нельзя изменить, но она в 100 раз быстрее и в 100 раз менее энергозатратна. Это путь создания ИИ в реальной жизни, в обход симуляции.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8 font-mono">
               <div className="p-6 border-2 border-term-red bg-white/5 border-red-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase text-term-red font-bold mb-1">REALTIME_SPEED</p>
                    <p className="text-4xl font-bold text-term-red leading-none">14 000</p>
                    <p className="text-[10px] text-term-red font-bold mt-1">tokens / sec</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase opacity-50 font-bold mb-1">LATENCY</p>
                    <p className="text-2xl font-bold leading-none">40ms</p>
                    <p className="text-[10px] opacity-50 font-bold mt-1">RESPONSE_TIME</p>
                  </div>
               </div>
               
               <div className="p-4 border-2 border-dashed border-white/20 bg-white/5">
                  <p className="text-[10px] font-bold mb-3 uppercase tracking-widest text-center underline">Comparison Matrix (tok/sec)</p>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between items-center">
                      <span>Nvidia B200</span>
                      <div className="flex-1 mx-4 h-2 bg-white/10 relative">
                        <div className="absolute left-0 top-0 h-full bg-white" style={{ width: '2.5%' }}></div>
                      </div>
                      <span>350</span>
                    </div>
                    <div className="flex justify-between items-center text-term-green">
                      <span>Cerebras</span>
                      <div className="flex-1 mx-4 h-2 bg-white/10 relative">
                        <div className="absolute left-0 top-0 h-full bg-term-green" style={{ width: '13.5%' }}></div>
                      </div>
                      <span>1900</span>
                    </div>
                    <div className="flex justify-between items-center text-term-red font-bold">
                      <span>Talos</span>
                      <div className="flex-1 mx-4 h-2 bg-white/10 relative">
                        <div className="absolute left-0 top-0 h-full bg-term-red" style={{ width: '100%' }}></div>
                      </div>
                      <span>14000</span>
                    </div>
                  </div>
               </div>
            </div>
            <p className="text-xs opacity-60 italic">
              «У компании уже есть большие контракты. Производство масштабируется на гигантские модели».
            </p>
          </Card>
        </div>
      </Section>

      {/* Conclusion Section */}
      <Section>
        <Headline title="Вывод" subtitle="Новый мир" />
        <div className="max-w-4xl font-mono">
           <p className="text-2xl md:text-4xl font-bold uppercase mb-12 border-l-8 border-term-black pl-6">
             {`> ИИ найдет самое лучшее решение. Главный навык — управление агентами.`}
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg leading-relaxed mb-12">
             <p className="opacity-80">
               Alpha Research показал результаты лучше самых лучших человеческих решений. ИИ заменит целые департаменты.
             </p>
             <p className="opacity-80">
               Вам нужно правильно писать промпты и выстраивать архитектуру. Это ключ к успеху.
             </p>
           </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section id="promo" dark className="flex items-center justify-center overflow-hidden min-h-screen">
        <AsciiGraphic type="computer" className="top-10 left-10 -rotate-12 text-term-green" delay={0.2} />
        <AsciiGraphic type="mole" className="bottom-10 right-10 rotate-12 text-term-green" delay={0.4} />
        <AsciiGraphic type="grandma" className="top-1/2 right-4 -translate-y-1/2 text-white" delay={0.6} />
        
        <div className="max-w-5xl mx-auto text-center font-mono relative z-10 w-full">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block p-8 md:p-12 border-4 border-term-green mb-12 bg-term-black"
          >
            <Gift className="w-16 h-16 md:w-20 md:h-20 text-term-green mx-auto" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 uppercase leading-[0.9] tracking-tighter text-white">
            ИИ В НАУЧНОЙ <br />
            <motion.span 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-term-green inline-block"
            >
              РАБОТЕ
            </motion.span>
          </h2>
          
          <div className="max-w-3xl mx-auto mb-16 p-6 md:p-8 border-4 border-dashed border-white/20 bg-term-black/50 backdrop-blur-sm">
            <p className="text-lg md:text-2xl leading-relaxed text-white">
              {`> Если есть вопросы по курсу «ИИ в научной работе», то пиши менеджерам:`}
              <span className="cursor-blink">_</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://agency.blastim.ru/scientist_of_the_future" 
              target="_blank" 
              className="w-full md:w-auto border-4 border-term-green bg-term-green text-white font-bold py-6 px-12 md:py-8 md:px-16 hover:bg-white hover:text-term-green transition-all text-xl md:text-2xl tracking-widest text-center shadow-[8px_8px_0px_0px_rgba(0,255,0,0.3)]"
            >
              {`EXEC: JOIN_FUTURE`}
            </motion.a>
            
            <div className="text-left font-mono border-l-2 border-white/20 pl-8 w-full md:w-auto">
                <p className="text-lg font-bold mb-4 text-white">{`MANAGERS:`}</p>
                <div className="space-y-3 text-xs md:text-sm">
                  <a href="https://t.me/varvara_blastim" target="_blank" className="block text-term-green hover:underline">@varvara_blastim</a>
                  <a href="https://t.me/eva_blastim" target="_blank" className="block text-term-red hover:underline">@eva_blastim</a>
                </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 border-t-2 border-term-black bg-white text-center font-mono">
        <p className="text-xs tracking-widest opacity-40 uppercase">
          {`$ Alexander Dekan // BLASTIM // 2026`}
          <span className="cursor-blink ml-1">_</span>
        </p>
      </footer>

      <AnimatePresence>
        {isMitModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none"
          >
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-term-black/80 pointer-events-auto"
              onClick={() => setIsMitModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white terminal-border p-8 md:p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.2)] pointer-events-auto overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsMitModalOpen(false)}
                className="absolute top-6 right-6 font-mono text-term-red hover:scale-110 transition-transform p-2 border-2 border-term-red uppercase text-xs font-bold"
              >
                {`[ ESC_CLOSE ]`}
              </button>
              
              <div className="font-mono text-term-red mb-4 text-xs uppercase tracking-widest">{`[ FILE: HISTORY_MIT_1950.LOG ]`}</div>
              <h3 className="text-3xl font-bold uppercase italic mb-8 border-b-4 border-term-red pb-4">1950-е: MIT</h3>
              
              <div className="space-y-6 text-lg leading-relaxed text-term-black">
                <p>
                  В 1950-х годах прошлого века люди начали делать машины в большом количестве (калькуляторы), а затем стали мечтать о создании искусственного интеллекта — мозга из проводов, который будет думать и даже быть умнее людей.
                </p>
                <div className="p-4 border-l-4 border-term-red bg-slate-50 italic text-sm">
                  Много работ в этом направлении велось в MIT в США.
                </div>
                <p>
                  Всё это было вдохновлено развитием нейронауки: люди посмотрели на мозг человека, увидели, что нейроны соединяются через аксоны и дендриты, и решили создать искусственный нейрон на железе с помощью проводов.
                </p>
                <p>
                  Так были созданы первые нейросети (многослойные перцептроны). Однако они не получили развития, потому что в 1950-х годах оборудование было недостаточно технологичным.
                </p>
              </div>
              
              <div className="mt-10 pt-6 border-t-2 border-slate-100 flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase">
                <span>{`STATUS: DECLASSIFIED`}</span>
                <span>{`REF_ID: MIT_1950_NEURON`}</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isBabbageModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none"
          >
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-term-black/80 pointer-events-auto"
              onClick={() => setIsBabbageModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white terminal-border p-8 md:p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.2)] pointer-events-auto overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsBabbageModalOpen(false)}
                className="absolute top-6 right-6 font-mono text-term-green hover:scale-110 transition-transform p-2 border-2 border-term-green uppercase text-xs font-bold"
              >
                {`[ ESC_CLOSE ]`}
              </button>
              
              <div className="font-mono text-term-green mb-4 text-xs uppercase tracking-widest">{`[ FILE: HISTORY_BABBAGE_ADA.LOG ]`}</div>
              <h3 className="text-3xl font-bold uppercase italic mb-8 border-b-4 border-term-green pb-4">Бэббидж и Ада</h3>
              
              <div className="space-y-6 text-lg leading-relaxed text-term-black">
                <p>
                  Люди очень давно мечтали об ИИ и общались с ним через симуляцию (писали книги, создавали образы голема, Сфинкса). Затем человечество начало развиваться: появились паровые двигатели, поезда, механизмы, логика. 
                </p>
                <div className="p-4 border-l-4 border-term-green bg-slate-50 italic text-sm">
                  Люди поняли, что с помощью логики и арифметики можно создать машину, которая будет делать предсказания и даже думать.
                </div>
                <p>
                  Первая такая машина была сделана в XIX веке (около 150 лет назад) Бэббиджем. Его ассистентка Ада Лавлейс была первой программисткой в мире — она программировала эту машину. 
                </p>
                <p>
                  Машина должна была проводить вычисления и выдавать результаты, хотя, по-видимому, так и не заработала. Это была одна из первых идей о том, что можно сделать машину, которая будет считать.
                </p>
              </div>
              
              <div className="mt-10 pt-6 border-t-2 border-slate-100 flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase">
                <span>{`STATUS: HISTORICAL_RECORD`}</span>
                <span>{`REF_ID: BABBAGE_ADA_ADA_XIX`}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
