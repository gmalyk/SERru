import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { organizationInfo } from '../../data/content';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './styles.css';

// Sidebar items for About page
const sidebarItems = [
  { id: 'goals', label: 'Цели и задачи', anchor: 'goals' },
  { id: 'authority', label: 'Полномочия', anchor: 'authority' },
  { id: 'documents', label: 'Документы', anchor: 'documents' },
  { id: 'join', label: 'Вступить в Союз', anchor: 'join' }
];

// Icons
const Icons = {
  check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  ),
  arrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12,19 5,12 12,5" />
    </svg>
  ),
  arrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  ),
  document: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  ),
  download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  chevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6,9 12,15 18,9" />
    </svg>
  ),
  chevronUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="18,15 12,9 6,15" />
    </svg>
  ),
  development: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  education: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
};

// Main activity directions
const activityDirections = [
  {
    id: 1,
    icon: 'development',
    title: 'Развитие',
    description: 'Развитие в сфере экологии и природопользования'
  },
  {
    id: 2,
    icon: 'shield',
    title: 'Защита',
    description: 'Защита предприятий и организаций в сфере экологии и природопользования'
  },
  {
    id: 3,
    icon: 'education',
    title: 'Образование',
    description: 'Профессиональное образование работников в сфере экологии и природопользования'
  }
];

// Authority rights list
const authorityRights = [
  'представлять и защищать права и охраняемые законом интересы членов объединения работодателей, а также работодателей — членов объединений работодателей, входящих в данное объединение работодателей, и субъектов предпринимательской деятельности, объединенных в некоммерческие организации, входящие в данное объединение работодателей, в случаях и в порядке, которые установлены уставами объединений работодателей;',
  'выступать с инициативой проведения коллективных переговоров по подготовке, заключению и изменению соглашений;',
  'предлагать участвовать работодателям, не являющимся членами объединения работодателей, в коллективных переговорах по заключению соглашений, регулирующих социально-трудовые отношения и связанные с ними экономические отношения, путем вступления в члены данного объединения работодателей или в других формах, определенных данным объединением работодателей;',
  'осуществлять контроль за выполнением заключенных объединением работодателей соглашений, регулирующих социально-трудовые отношения и связанные с ними экономические отношения, в том числе региональных соглашений о минимальной заработной плате, другими сторонами этих соглашений, а также работодателями, которые уполномочили данное объединение работодателей от их имени заключить эти соглашения либо присоединились к этим соглашениям после их заключения, и работодателями, на которых действие этих соглашений распространено в порядке, установленном Трудовым кодексом Российской Федерации;',
  'наделять своих представителей полномочиями на ведение коллективных переговоров по подготовке, заключению и изменению соглашений, участвовать в формировании и деятельности соответствующих комиссий по регулированию социально-трудовых отношений, примирительных комиссиях, трудовом арбитраже по рассмотрению и разрешению коллективных трудовых споров;',
  'вносить в соответствующие органы государственной власти, органы местного самоуправления предложения о принятии законов и иных нормативных правовых актов по вопросам, затрагивающим права и охраняемые законом интересы работодателей, участвовать в разработке указанных нормативных правовых актов;',
  'участвовать в установленном федеральными законами порядке в разработке и (или) обсуждении проектов законов и иных нормативных правовых актов, других актов органов государственной власти, органов местного самоуправления, в разработке документов стратегического планирования;',
  'оспаривать от своего имени в установленном федеральными законами порядке любые акты, решения и (или) действия (бездействие) органов государственной власти Российской Федерации, органов государственной власти субъектов Российской Федерации, органов местного самоуправления, нарушающие права и охраняемые законом интересы объединения работодателей или создающие угрозу такого нарушения;',
  'направлять в порядке, установленном федеральными законами и иными нормативными правовыми актами Российской Федерации, законами и иными нормативными правовыми актами субъектов Российской Федерации, нормативными правовыми актами органов местного самоуправления, своих представителей в состав общественных советов, постоянных и временных рабочих групп, комиссий, создаваемых при органах исполнительной и законодательной власти, органах местного самоуправления по вопросам, затрагивающим охраняемые законом интересы работодателей в сфере социально-трудовых отношений и связанных с ними экономических отношений;',
  'принимать в порядке, установленном федеральными законами и иными нормативными правовыми актами Российской Федерации, участие в формировании и реализации государственной политики в сфере социально-трудовых отношений и связанных с ними экономических отношений;',
  'проводить консультации (переговоры) с профессиональными союзами и их объединениями, органами исполнительной власти, органами местного самоуправления по основным направлениям социально-экономической политики;',
  'участвовать в порядке, установленном федеральными законами и иными нормативными правовыми актами Российской Федерации, в формировании основных направлений миграционной политики, определении потребностей экономики в привлечении и использовании иностранных работников;',
  'получать от профессиональных союзов и их объединений, органов исполнительной власти, органов местного самоуправления имеющуюся у них информацию по социально-трудовым вопросам, необходимую для ведения коллективных переговоров в целях подготовки, заключения и изменения соглашений, контроля за их выполнением;',
  'участвовать в мониторинге и прогнозировании потребностей экономики в квалифицированных кадрах, а также в разработке и реализации государственной политики в области среднего профессионального образования и высшего образования, в том числе в разработке федеральных государственных образовательных стандартов, формировании перечней профессий, специальностей и направлений подготовки, государственной аккредитации образовательной деятельности профессиональных образовательных организаций и образовательных организаций высшего образования, в порядке, установленном Правительством Российской Федерации;',
  'участвовать в порядке, установленном федеральными законами и иными нормативными правовыми актами Российской Федерации, в создании и развитии системы профессиональных квалификаций в Российской Федерации, формировании системы независимой оценки квалификации работника, разработке и экспертизе проектов профессиональных стандартов.'
];

// Authority obligations list
const authorityObligations = [
  'вести в порядке, установленном федеральными законами, коллективные переговоры, заключать на согласованных условиях соглашения с профессиональными союзами и их объединениями',
  'выполнять заключенные соглашения в части, касающейся обязанностей объединения работодателей',
  'предоставлять своим членам информацию о заключенных объединением работодателей соглашениях и тексты этих соглашений',
  'предоставлять профессиональным союзам и их объединениям, органам исполнительной власти, органам местного самоуправления имеющуюся у объединения работодателей информацию по социально-трудовым вопросам, необходимую для ведения коллективных переговоров в целях подготовки, заключения и изменения соглашений, контроля за их выполнением',
  'осуществлять контроль за выполнением заключенных объединением работодателей соглашений',
  'содействовать выполнению членами объединения работодателей обязательств, предусмотренных соглашениями, а также коллективных договоров, заключенных работодателями – членами объединения работодателей',
  'отчитываться перед своими членами о деятельности объединения работодателей в порядке и в сроки, которые предусмотрены уставом объединения работодателей',
  'оказывать своим членам помощь в вопросах применения законодательства, регулирующего трудовые отношения и иные непосредственно связанные с ними отношения, разработки локальных нормативных актов, содержащих нормы трудового права, заключения коллективных договоров, соглашений, а также разрешения индивидуальных и коллективных трудовых споров',
  'исполнять иные предусмотренные уставом объединения работодателей обязанности'
];

// Documents for read-only viewing
const readOnlyDocuments = [
  { id: 'ustav', title: 'Устав ОМОР «Союз Экологов России»', file: 'НОВЫЙ-УСТАВ-СЭР-2025-1.pdf', type: 'PDF' },
  { id: 'membership', title: 'Положение о членстве в ОМОР «Союз Экологов России»', file: 'polozhenie-o-chlenstve-v-omor-sjer-dlja-sajta-ot-10.10.2023-3.pdf', type: 'PDF' },
  { id: 'prikaz', title: 'Приказ о вступлении в должность Генерального директора Тюрина В.А.', file: 'prikaz', type: 'PDF' },
  { id: 'rekvizity', title: 'Карточка ОМОР «Союз Экологов России»', file: 'rekvizity', type: 'PDF' }
];

// Downloadable documents for joining
const downloadableDocuments = [
  { id: 'application', title: 'Заявление о приеме в члены ОМОР СЭР', file: 'zajavlenie-o-prieme-v-chleny-omor-sjer.docx', type: 'DOCX', canDownload: true },
  { id: 'anketa', title: 'Анкета члена ОМОР СЭР', file: 'anketa-chlena-omor-sjer.docx', type: 'DOCX', canDownload: true },
  { id: 'perechen', title: 'Перечень документов для вступления в ОМОР', file: 'perechen-dokumentov-dlja-vstuplenija-v-omor.pdf', type: 'PDF', canDownload: false }
];

function About() {
  const [currentSection, setCurrentSection] = useState('goals');
  const [showRightsDetails, setShowRightsDetails] = useState(false);
  const location = useLocation();

  // Scroll to hash on mount or when hash changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  // Track scroll position to update active sidebar item
  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarItems.map(item => ({
        id: item.anchor,
        element: document.getElementById(item.anchor)
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDirectionIcon = (iconName) => {
    switch (iconName) {
      case 'development': return Icons.development();
      case 'shield': return Icons.shield();
      case 'education': return Icons.education();
      default: return Icons.check();
    }
  };

  return (
    <div className="about-page">
      {/* Navbar with sidebar */}
      <Navbar
        showSidebar={true}
        sidebarItems={sidebarItems}
        currentSection={currentSection}
      />

      {/* Back Button */}
      <section className="back-section">
        <div className="container">
          <Link to="/" className="back-link">
            {Icons.arrowLeft()}
            <span>Назад</span>
          </Link>
        </div>
      </section>

      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>О Союзе</h1>
          <div className="hero-text-block">
            <p>
              14 сентября 2023 года в Единый государственный реестр юридических лиц внесена запись о
              государственной регистрации Общероссийского межотраслевого объединения работодателей в
              сфере экологии и природопользования «Союз Экологов России».
            </p>
            <p>
              <strong>Общероссийский статус</strong> подтверждает, что Союз Экологов России объединяет работодателей,
              которые в совокупности осуществляют свою деятельность на территориях более половины
              субъектов Российской Федерации и (или) с которыми состоит в трудовых отношениях не менее
              половины работников отрасли.
            </p>
            <p>
              <strong>Межотраслевую принадлежность</strong> Союз Экологов России подтверждает ее специализированный
              характер как некоммерческой организации, объединяющей работодателей, осуществляющих
              свою деятельность в сфере экологии и природопользования или осуществляющих указанный вид
              экономической (профессиональной) деятельности в этой сфере.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section about-section-alt">
        <div className="container">
          <div className="section-header-left">
            <span className="section-tag">О нас</span>
            <h2>Наша миссия</h2>
          </div>
          <div className="mission-content">
            <p>
              Содействие развитию бизнеса посредством представительства и защиты интересов работодателей
              в социально-трудовой, экономической и других сферах в отношениях с профессиональными
              союзами, органами государственной власти, органами местного самоуправления, выработки и
              проведения согласованной социально-ответственной политики организаций – членов объединения.
            </p>
            <p>
              Содействие осуществлению государственной политики в сфере обеспечения экологической
              безопасности сохранению и восстановлению природной среды, обеспечению качества
              окружающей среды, необходимого для благоприятной жизни человека и устойчивого развития
              экономики, ликвидации накопленного вреда окружающей среде вследствие хозяйственной и
              иной деятельности в условиях возрастающей экономической активности и глобальных изменений
              климата.
            </p>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="about-section" id="goals">
        <div className="container">
          <div className="section-header-left">
            <h2>Наши цели и задачи</h2>
          </div>
          <div className="goals-intro">
            <p>
              Свою цель Общероссийского межотраслевого объединения работодателей в сфере экологии и
              природопользования «Союз Экологов России» (ОМОР) видит в формировании
              консолидированного сообщества профессионалов, работодателей в сфере экологии и
              природопользования.
            </p>
            <p>
              Главной задачей Союза Экологов России является развитие социального партнерства и
              межсекторного взаимодействия (власть-общество-бизнес) в сфере экологии и
              природопользования, а также обеспечение участия работодателей в формировании и проведении
              согласованной политики в сфере социально-трудовых отношений и связанных с ними
              экономических отношений.
            </p>
          </div>

          <div className="directions-header">
            <h3>Деятельность Союза Экологов России сосредоточена в трех основных направлениях:</h3>
          </div>

          <div className="directions-grid">
            {activityDirections.map((direction) => (
              <div key={direction.id} className="direction-card">
                <div className="direction-icon">
                  {getDirectionIcon(direction.icon)}
                </div>
                <div className="direction-number">{direction.id}</div>
                <h4>{direction.title}</h4>
                <p>{direction.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="about-section about-section-alt" id="authority">
        <div className="container">
          <div className="section-header-left">
            <h2>Полномочия</h2>
          </div>

          <div className="authority-intro">
            <p>
              Согласно ст. 5 Конвенции № 87 Международной организации труда «Относительно свободы
              ассоциаций и защиты права на организацию», Конституции РФ, Трудовому кодексу РФ и
              Федеральным законом от 27.11.2002 № 156-ФЗ «Об объединениях работодателей», ОМОР
              самостоятельно определяет цели, виды и направления своей деятельности. При этом
              взаимодействие объединений работодателей, профессиональных союзов и их объединений,
              органов государственной власти, органов местного самоуправления в сфере социально-трудовых
              отношений и связанных с ними экономических отношений осуществляется на основе принципов
              социального партнерства.
            </p>
            <p>
              Как и другие некоммерческие организации, объединения работодателей осуществляют свою
              деятельность независимо от органов государственной власти, органов местного самоуправления,
              профессиональных союзов и их объединений, политических партий и движений, других
              общественных организаций.
            </p>
          </div>

          <div className="authority-rights-section">
            <div className="authority-rights-header">
              <h3>Основные права объединения работодателей</h3>
              <button
                className={`details-toggle ${showRightsDetails ? 'active' : ''}`}
                onClick={() => setShowRightsDetails(!showRightsDetails)}
              >
                <span>{showRightsDetails ? 'Скрыть' : 'Подробнее'}</span>
                {showRightsDetails ? Icons.chevronUp() : Icons.chevronDown()}
              </button>
            </div>

            <p className="authority-rights-intro">
              Как некоммерческая организация особого рода, правовой статус и организация деятельности
              которой регламентируется актами не только внутреннего, но и международного законодательства,
              объединение работодателей приобретает следующие права:
            </p>

            <div className={`authority-rights-list ${showRightsDetails ? 'expanded' : ''}`}>
              {authorityRights.map((right, idx) => (
                <div key={idx} className="authority-right-item">
                  <span className="bullet-icon">{Icons.check()}</span>
                  <p>{right}</p>
                </div>
              ))}
            </div>

            {showRightsDetails && (
              <>
                <p className="authority-equal-rights">
                  Объединения работодателей имеют равные с профессиональными союзами и их объединениями,
                  органами государственной власти права на паритетное представительство в органах управления
                  государственных внебюджетных фондов в соответствии с законодательством Российской Федерации.
                </p>

                <h4 className="authority-obligations-title">Обязанности объединения работодателей:</h4>
                <div className="authority-obligations-list">
                  {authorityObligations.map((obligation, idx) => (
                    <div key={idx} className="authority-obligation-item">
                      <span className="bullet-icon">{Icons.check()}</span>
                      <p>{obligation}</p>
                    </div>
                  ))}
                </div>

                <div className="authority-responsibility">
                  <p>
                    Более того, объединение работодателей несет ответственность за нарушение или невыполнение
                    заключенных им соглашений в части, касающейся обязательств этого объединения, в порядке,
                    предусмотренном законодательством Российской Федерации, указанными соглашениями.
                  </p>
                  <p>
                    Соответствующая ответственность предусмотрена в ряде статей Кодекса РФ об административных
                    правонарушениях, например, в его статье 5.31 «Нарушение или невыполнение обязательств по
                    коллективному договору, соглашению».
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="about-section" id="documents">
        <div className="container">
          <div className="section-header-left">
            <h2>Документы</h2>
          </div>
          <p className="documents-note">Документы доступны для просмотра в режиме чтения</p>
          <div className="documents-grid">
            {readOnlyDocuments.map((doc) => (
              <a
                key={doc.id}
                href={doc.file === 'prikaz' || doc.file === 'rekvizity' ? `/document?doc=${doc.file}` : `/document?doc=${doc.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="document-card"
              >
                <div className="document-icon">{Icons.document()}</div>
                <div className="document-info">
                  <h4>{doc.title}</h4>
                  <span>{doc.type}</span>
                </div>
                <div className="document-view">
                  {Icons.arrowRight()}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="about-section join-section" id="join">
        <div className="container">
          <div className="join-content-wrapper">
            <div className="section-header-left">
              <h2>Вступить в Союз</h2>
            </div>

            <div className="join-text-content">
              <p>
                Согласно Уставу Союза Экологов России, его деятельность осуществляется на основе принципа
                добровольности вступления в него и выхода из него работодателей.
              </p>
              <p>
                <strong>Членами Союза Экологов России</strong> могут быть юридические лица, осуществляющие деятельность в
                сфере экологии и природопользования.
              </p>
              <p>
                Прием в члены Союза Экологов России производится на основе соответствующего письменного
                заявления.
              </p>
            </div>

            <div className="join-documents-section">
              <h3>Документы для вступления:</h3>
              <div className="join-documents-grid">
                {downloadableDocuments.map((doc) => (
                  <div key={doc.id} className={`join-document-card ${doc.canDownload ? 'downloadable' : ''}`}>
                    <div className="document-icon">{Icons.document()}</div>
                    <div className="document-info">
                      <h4>{doc.title}</h4>
                      <span>{doc.type}</span>
                    </div>
                    {doc.canDownload ? (
                      <a
                        href={`/documents/${doc.file}`}
                        download
                        className="document-download"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {Icons.download()}
                        <span>Скачать</span>
                      </a>
                    ) : (
                      <a
                        href={`/document?doc=${doc.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="document-view-btn"
                      >
                        {Icons.arrowRight()}
                        <span>Просмотр</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="join-process">
              <p>
                Решение о приеме в члены объединения работодателей принимает <strong>Правление Союза Экологов
                  России</strong> на ближайшем после подачи заявления о вступлении заседании.
              </p>
              <p>
                Порядок членства и размер членских взносов устанавливаются <strong>Положением о членстве в ОМОР
                  «Союз Экологов России»</strong>
              </p>
            </div>

            <Link to="/#contacts" className="btn btn-primary">
              <span>Связаться с нами</span>
              {Icons.arrowRight()}
            </Link>
          </div>
        </div>
      </section>

      {/* Registration Info */}
      <section className="about-section about-section-alt">
        <div className="container">
          <h2>Регистрационные данные</h2>
          <div className="registration-grid">
            <div className="registration-card">
              <strong>ОГРН</strong>
              <p>{organizationInfo.registration.ogrn}</p>
            </div>
            <div className="registration-card">
              <strong>ИНН</strong>
              <p>{organizationInfo.registration.inn}</p>
            </div>
            <div className="registration-card">
              <strong>Дата регистрации</strong>
              <p>{organizationInfo.registration.date}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
