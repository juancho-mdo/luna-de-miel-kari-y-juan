import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
// Dialog removed — replaced with inline wizard steps
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Hotel,
  UtensilsCrossed,
  Sailboat,
  Wine,
  Sparkles,
  Heart,
  Camera,
  MapPin,
  ChevronDown,
  Copy,
  Check,
  ArrowLeft,
  Send,
  Mail,
  Car,
  Crown,
  Anchor,
  Sun,
  Waves,
} from "lucide-react";

/* ───────────────────────────── DATA ───────────────────────────── */

interface GiftItem {
  id: string;
  title: string;
  description: string;
  totalPrice: number;
  funded: number;
  icon: React.ReactNode;
  location: string;
  image: string;
}

const GIFTS: GiftItem[] = [
  {
    id: "vuelos",
    title: "Vuelos CDMX → Europa",
    description:
      "Vuelos ida y vuelta desde Ciudad de México a Europa para empezar nuestra aventura mediterránea.",
    totalPrice: 2000,
    funded: 0,
    icon: <Plane className="w-6 h-6" />,
    location: "CDMX → Europa",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=400&fit=crop",
  },
  {
    id: "traslados",
    title: "Traslados & movilidad interna",
    description:
      "Ferrys entre islas griegas, trenes por Italia, autos de alquiler y traslados para movernos cómodos.",
    totalPrice: 1000,
    funded: 0,
    icon: <Car className="w-6 h-6" />,
    location: "Múltiples destinos",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
  },
  {
    id: "hotel-santorini",
    title: "3 noches de hotel en Santorini",
    description:
      "Hotel con vista a la caldera volcánica, atardeceres en Oia y las casitas blancas con cúpulas azules.",
    totalPrice: 1500,
    funded: 0,
    icon: <Hotel className="w-6 h-6" />,
    location: "Santorini, Grecia",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop",
  },
  {
    id: "cenas-santorini",
    title: "Cenas en Santorini",
    description:
      "Dos cenas especiales en los mejores restaurantes de Santorini: Lauda y Therasia, con vista al mar Egeo.",
    totalPrice: 500,
    funded: 0,
    icon: <UtensilsCrossed className="w-6 h-6" />,
    location: "Santorini, Grecia",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
  },
  {
    id: "catamaran",
    title: "Catamarán al atardecer en Santorini",
    description:
      "Navegación por la caldera volcánica de Santorini al atardecer, con vino y cena a bordo.",
    totalPrice: 400,
    funded: 0,
    icon: <Sailboat className="w-6 h-6" />,
    location: "Santorini, Grecia",
    image:
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&h=400&fit=crop",
  },
  {
    id: "wine-tour",
    title: "Wine tour en Italia",
    description:
      "Un día recorriendo viñedos de la Toscana, degustando Chianti y Brunello con vista a los cipreses.",
    totalPrice: 300,
    funded: 0,
    icon: <Wine className="w-6 h-6" />,
    location: "Toscana, Italia",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop",
  },
  {
    id: "spa",
    title: "Día de Spa en pareja",
    description:
      "Un día de relax total con masajes, tratamientos y piscinas termales para los dos.",
    totalPrice: 300,
    funded: 0,
    icon: <Sparkles className="w-6 h-6" />,
    location: "Mediterráneo",
    image:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&h=400&fit=crop",
  },
  {
    id: "hotel-milos",
    title: "2 noches de hotel en Milos",
    description:
      "Hotel en la isla más secreta de las Cícladas, famosa por Sarakiniko y sus playas de roca blanca lunar.",
    totalPrice: 900,
    funded: 0,
    icon: <Hotel className="w-6 h-6" />,
    location: "Milos, Grecia",
    image:
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&h=400&fit=crop",
  },
  {
    id: "barco-milos",
    title: "Tour en barco por Milos",
    description:
      "Recorrido en velero por las cuevas marinas, playas escondidas y formaciones rocosas de Milos.",
    totalPrice: 400,
    funded: 0,
    icon: <Anchor className="w-6 h-6" />,
    location: "Milos, Grecia",
    image:
      "https://images.unsplash.com/photo-1534854638093-bada1813ca19?w=600&h=400&fit=crop",
  },
  {
    id: "hotel-positano",
    title: "Hotel en Positano",
    description:
      "Alojamiento en el pueblo más fotogénico de la Costa Amalfitana, con balcón al mar Tirreno.",
    totalPrice: 600,
    funded: 0,
    icon: <Hotel className="w-6 h-6" />,
    location: "Positano, Italia",
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&h=400&fit=crop",
  },
  {
    id: "upgrade-habitacion",
    title: "Upgrade de habitación",
    description:
      "Mejorar a una habitación con terraza panorámica o suite con mejores vistas en cualquier destino.",
    totalPrice: 300,
    funded: 0,
    icon: <Crown className="w-6 h-6" />,
    location: "Cualquier destino",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
  },
  {
    id: "hotel-antibes",
    title: "2 noches de hotel en Antibes",
    description:
      "Hotel en la Riviera Francesa, entre Niza y Cannes, con playas de aguas turquesas y pueblo medieval.",
    totalPrice: 800,
    funded: 0,
    icon: <Hotel className="w-6 h-6" />,
    location: "Antibes, Francia",
    image:
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&h=400&fit=crop",
  },
  {
    id: "chevre-dor",
    title: "Road trip & cena en Le Chèvre d'Or",
    description:
      "Ruta panorámica por la Riviera Francesa hasta Èze, con cena en el restaurante Le Chèvre d'Or.",
    totalPrice: 400,
    funded: 0,
    icon: <UtensilsCrossed className="w-6 h-6" />,
    location: "Èze, Francia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop",
  },
  {
    id: "hotel-mallorca",
    title: "2 noches de hotel en Mallorca",
    description:
      "Hotel en la isla más grande de las Baleares, con calas de agua cristalina y montañas de la Serra de Tramuntana.",
    totalPrice: 800,
    funded: 0,
    icon: <Hotel className="w-6 h-6" />,
    location: "Mallorca, España",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
  },
  {
    id: "roadtrip-mallorca",
    title: "Road trip & spa en Mallorca",
    description:
      "Día de ruta en auto por la Serra de Tramuntana con parada en un spa con vistas al Mediterráneo.",
    totalPrice: 400,
    funded: 0,
    icon: <Car className="w-6 h-6" />,
    location: "Mallorca, España",
    image:
      "https://images.unsplash.com/photo-1591167091400-0a5c22b60e9f?w=600&h=400&fit=crop",
  },
  {
    id: "hotel-formentera",
    title: "2 noches de hotel en Formentera",
    description:
      "La isla más paradisíaca del Mediterráneo. Playas de arena blanca y aguas caribeñas en pleno mar Balear.",
    totalPrice: 1000,
    funded: 0,
    icon: <Hotel className="w-6 h-6" />,
    location: "Formentera, España",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
  },
  {
    id: "buceo-formentera",
    title: "Día de buceo en Formentera",
    description:
      "Inmersión guiada para dos en las aguas cristalinas de Formentera, descubriendo la vida marina del Mediterráneo.",
    totalPrice: 300,
    funded: 0,
    icon: <Waves className="w-6 h-6" />,
    location: "Formentera, España",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
  },
  {
    id: "cena-cala-di-volpe",
    title: "Cena en la Costa Esmeralda",
    description:
      "Cena frente al mar en la Costa Esmeralda de Cerdeña. Cocina sarda, mariscos y atardecer sobre el Mediterráneo.",
    totalPrice: 400,
    funded: 0,
    icon: <UtensilsCrossed className="w-6 h-6" />,
    location: "Cerdeña, Italia",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  },
  /* ── 10 EXPERIENCIAS IMPERDIBLES ── */
  {
    id: "acropolis-atenas",
    title: "Atardecer en la Acrópolis de Atenas",
    description:
      "Tour por la Acrópolis y el Partenón al atardecer, con guía en español y vistas a toda Atenas.",
    totalPrice: 400,
    funded: 0,
    icon: <Camera className="w-6 h-6" />,
    location: "Atenas, Grecia",
    image:
      "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&h=400&fit=crop",
  },
  {
    id: "clase-cocina-italia",
    title: "Clase de cocina italiana",
    description:
      "Aprender a hacer pasta fresca y tiramisú con un chef local en un pueblo de la Toscana. Almuerzo incluido.",
    totalPrice: 400,
    funded: 0,
    icon: <UtensilsCrossed className="w-6 h-6" />,
    location: "Toscana, Italia",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop",
  },
  {
    id: "paseo-capri",
    title: "Día en Capri y los Faraglioni",
    description:
      "Paseo en barco alrededor de los Faraglioni, visita a la Grotta Azzurra y recorrida por las callecitas de Capri.",
    totalPrice: 400,
    funded: 0,
    icon: <Anchor className="w-6 h-6" />,
    location: "Capri, Italia",
    image:
      "https://images.unsplash.com/photo-1533606688076-b6683a5f59f1?w=600&h=400&fit=crop",
  },
  {
    id: "barco-amalfi",
    title: "Tour en barco por la Costa Amalfitana",
    description:
      "Día completo navegando de Positano a Amalfi pasando por cuevas escondidas, con almuerzo a bordo.",
    totalPrice: 500,
    funded: 0,
    icon: <Sailboat className="w-6 h-6" />,
    location: "Costa Amalfitana, Italia",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop",
  },
  {
    id: "guitarra-espana",
    title: "Concierto de guitarra española",
    description:
      "Noche de guitarra flamenca en vivo con cena y vinos en un local íntimo. Música, arte y gastronomía española.",
    totalPrice: 300,
    funded: 0,
    icon: <Sparkles className="w-6 h-6" />,
    location: "España",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&h=400&fit=crop",
  },
  {
    id: "buceo-mediterraneo",
    title: "Buceo en el Mediterráneo",
    description:
      "Inmersión guiada para dos en aguas cristalinas, descubriendo fondos marinos y vida submarina.",
    totalPrice: 400,
    funded: 0,
    icon: <Anchor className="w-6 h-6" />,
    location: "Grecia o España",
    image:
      "https://images.unsplash.com/photo-1544551763-77932985c982?w=600&h=400&fit=crop",
  },
  {
    id: "creta-aventura",
    title: "2 noches en Creta",
    description:
      "La isla más grande de Grecia: playas de Elafonisi, gargantas de Samariá y la mejor cocina griega tradicional.",
    totalPrice: 800,
    funded: 0,
    icon: <Hotel className="w-6 h-6" />,
    location: "Creta, Grecia",
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=600&h=400&fit=crop",
  },
  {
    id: "cinque-terre",
    title: "Día en Cinque Terre",
    description:
      "Tren panorámico entre los cinco pueblos coloridos de la costa de Liguria, con focaccia y pesto genovés.",
    totalPrice: 400,
    funded: 0,
    icon: <MapPin className="w-6 h-6" />,
    location: "Cinque Terre, Italia",
    image:
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&h=400&fit=crop",
  },
  {
    id: "ibiza-sunset",
    title: "Atardecer en Ibiza",
    description:
      "Atardecer frente al mar en un beach club de Ibiza, con cena y música con vista al Mediterráneo.",
    totalPrice: 500,
    funded: 0,
    icon: <Sun className="w-6 h-6" />,
    location: "Ibiza, España",
    image:
      "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=600&h=400&fit=crop",
  },
  {
    id: "globo-capadocia",
    title: "Vuelo en globo aerostático",
    description:
      "Sobrevolar paisajes mediterráneos al amanecer en globo aerostático. Una experiencia única e inolvidable.",
    totalPrice: 600,
    funded: 0,
    icon: <Plane className="w-6 h-6" />,
    location: "Mediterráneo",
    image:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=600&h=400&fit=crop",
  },
];

interface BankAccount {
  currency: string;
  currencyCode: string;
  flag: string;
  bankName: string;
  accountHolder: string;
  fields: { label: string; value: string }[];
}

const BANK_ACCOUNTS: BankAccount[] = [
  {
    currency: "Pesos Argentinos",
    currencyCode: "ARS",
    flag: "🇦🇷",
    bankName: "BBVA Argentina",
    accountHolder: "Juan Francisco Monte de Oca",
    fields: [
      { label: "Tipo de cuenta", value: "Caja de Ahorro en $" },
      { label: "Número de cuenta", value: "165-65245/0" },
      { label: "CBU", value: "0170165040000006524506" },
      { label: "Alias CBU", value: "JMONTEDEOCA" },
      { label: "Código SWIFT", value: "BFRPARBAXXX" },
    ],
  },
  {
    currency: "Dólares (cuenta Argentina)",
    currencyCode: "USD",
    flag: "🇦🇷",
    bankName: "BBVA Argentina",
    accountHolder: "Juan Francisco Monte de Oca",
    fields: [
      { label: "Tipo de cuenta", value: "Caja de Ahorro en U$S" },
      { label: "Número de cuenta", value: "165-519304/6" },
      { label: "CBU", value: "0170165044000051930460" },
      { label: "Alias CBU", value: "GROSOR.SORTEO.APODO" },
      { label: "Código SWIFT", value: "BFRPARBAXXX" },
    ],
  },
  {
    currency: "Pesos Mexicanos",
    currencyCode: "MXN",
    flag: "🇲🇽",
    bankName: "BBVA México",
    accountHolder: "Juan Francisco Monte De Oca",
    fields: [
      { label: "Número de cuenta", value: "153 100 9898" },
      { label: "CLABE", value: "012 180 01531009898 0" },
      { label: "Código SWIFT", value: "BCMRMXMMPYM" },
    ],
  },
  {
    currency: "Dólares (cuenta EE.UU.)",
    currencyCode: "USD",
    flag: "🇺🇸",
    bankName: "Lead Bank",
    accountHolder: "Juan Francisco Monte de Oca Provenzano",
    fields: [
      { label: "Número de cuenta", value: "218418851965" },
      { label: "Número de ruta", value: "101019644" },
      { label: "Tipo de cuenta", value: "Checking" },
      { label: "Dirección", value: "Coahuila 159, CDMX 06700, México" },
    ],
  },
];

const WHATSAPP_KARI = "5491169027629";
const WHATSAPP_JUAN = "525540043162";
const NOTIFICATION_EMAIL = "karinavrossini@gmail.com";

/* ───────────────────────────── COMPONENTS ───────────────────────────── */

type AppView = "home" | "gift-detail" | "thank-you";
type GiftStep = 1 | 2 | 3; // 1=form, 2=bank info, 3=notify

function GiftCard({
  gift,
  onSelect,
  extraFunded = 0,
}: {
  gift: GiftItem;
  onSelect: (g: GiftItem) => void;
  extraFunded?: number;
}) {
  const totalFunded = gift.funded + extraFunded;
  const percent = Math.min((totalFunded / gift.totalPrice) * 100, 100);
  const remaining = Math.max(gift.totalPrice - totalFunded, 0);

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="relative h-48 overflow-hidden">
        <img
          src={gift.image}
          alt={gift.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-white/90 text-foreground backdrop-blur-sm text-xs font-medium"
          >
            {gift.location}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2 pt-4 px-5">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="text-[#84814E]">{gift.icon}</span>
          <CardTitle className="text-xl font-semibold leading-tight">
            {gift.title}
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          {gift.description}
        </p>
      </CardHeader>
      <CardContent className="px-5 pb-2">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Recaudado:{" "}
              <span className="font-semibold text-foreground">
                USD {totalFunded.toLocaleString()}
              </span>
            </span>
            <span className="text-muted-foreground">
              Meta:{" "}
              <span className="font-semibold text-foreground">
                USD {gift.totalPrice.toLocaleString()}
              </span>
            </span>
          </div>
          <Progress value={percent} className="h-2" />
          {remaining > 0 ? (
            <p className="text-xs text-muted-foreground">
              Faltan USD {remaining.toLocaleString()}
            </p>
          ) : (
            <p className="text-xs text-green-600 font-medium">
              ✓ Meta alcanzada — ¡Gracias!
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-2">
        <Button
          onClick={() => onSelect(gift)}
          className="w-full bg-[#84814E] hover:bg-[#6e6c42] text-white"
          disabled={remaining <= 0}
        >
          {remaining > 0 ? "Quiero aportar" : "Completado"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <span className="text-xs text-muted-foreground block">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
      <button
        onClick={handleCopy}
        className="ml-3 p-1.5 rounded hover:bg-muted transition-colors"
        title="Copiar"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
}

function BankAccountCard({ account }: { account: BankAccount }) {
  return (
    <div className="border rounded-lg p-4 bg-white space-y-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{account.flag}</span>
        <div>
          <p className="font-semibold text-sm">{account.currency}</p>
          <p className="text-xs text-muted-foreground">{account.bankName}</p>
        </div>
      </div>
      <Separator />
      <CopyField label="Titular" value={account.accountHolder} />
      {account.fields.map((f, i) => (
        <CopyField key={i} label={f.label} value={f.value} />
      ))}
    </div>
  );
}

function sendEmailNotification(
  guestName: string,
  guestEmail: string,
  giftTitle: string,
  amount: string,
  message: string
) {
  const subject = encodeURIComponent(
    `Nuevo regalo de ${guestName} - ${giftTitle}`
  );
  const body = encodeURIComponent(
    `¡Hola Karina y Juan!\n\n${guestName} les dejó un regalo:\n\nExperiencia: ${giftTitle}\nMonto: ${amount}\nEmail: ${guestEmail}\n${message ? `Mensaje: ${message}\n` : ""}\n¡Felicidades!`
  );
  window.open(
    `mailto:${NOTIFICATION_EMAIL}?subject=${subject}&body=${body}`,
    "_blank"
  );
}

/* ───────────────────────────── APP ───────────────────────────── */

// Helper to load/save contributions from localStorage
function loadContributions(): Record<string, number> {
  try {
    const saved = localStorage.getItem("wedding-contributions");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveContributions(c: Record<string, number>) {
  try {
    localStorage.setItem("wedding-contributions", JSON.stringify(c));
  } catch { /* ignore */ }
}

export default function App() {
  const [view, setView] = useState<AppView>("home");
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [contributionAmount, setContributionAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [contributions, setContributions] = useState<Record<string, number>>(loadContributions);
  const [giftStep, setGiftStep] = useState<GiftStep>(1);
  const giftsRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  // Helper to get total funded for a gift
  const getFunded = (gift: GiftItem) => gift.funded + (contributions[gift.id] || 0);

  const scrollToGifts = () => {
    giftsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToStep = () => {
    setTimeout(() => {
      stepRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSelectGift = (gift: GiftItem) => {
    setSelectedGift(gift);
    setContributionAmount("");
    setSelectedCurrency("USD");
    setGuestName("");
    setGuestEmail("");
    setGuestMessage("");
    setGiftStep(1);
    setView("gift-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToStep2 = () => {
    if (!guestName.trim() || !guestEmail.trim() || !contributionAmount) return;
    setGiftStep(2);
    scrollToStep();
  };

  const handleConfirmTransfer = () => {
    if (!selectedGift) return;
    const amount = Number(contributionAmount) || 0;
    const newContributions = { ...contributions };
    newContributions[selectedGift.id] = (newContributions[selectedGift.id] || 0) + amount;
    setContributions(newContributions);
    saveContributions(newContributions);
    setGiftStep(3);
    scrollToStep();
  };

  const currencySymbol = selectedCurrency === "ARS" ? "ARS" : selectedCurrency === "MXN" ? "MXN" : "USD";

  const buildWhatsAppMsg = () => {
    const amount = contributionAmount;
    return encodeURIComponent(
      `¡Hola Karina y Juan! 🎉\n\nSoy ${guestName.trim()} y les quiero aportar para *${selectedGift?.title}*.\n\nMonto: ${currencySymbol} ${amount}\n${guestMessage.trim() ? `Mensaje: ${guestMessage.trim()}\n` : ""}\nMi email: ${guestEmail.trim()}\n\n¡Ya hice la transferencia! 🎁`
    );
  };

  const handleWhatsAppKari = () => {
    window.open(`https://wa.me/${WHATSAPP_KARI}?text=${buildWhatsAppMsg()}`, "_blank");
    setView("thank-you");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppJuan = () => {
    window.open(`https://wa.me/${WHATSAPP_JUAN}?text=${buildWhatsAppMsg()}`, "_blank");
    setView("thank-you");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmail = () => {
    sendEmailNotification(
      guestName.trim(),
      guestEmail.trim(),
      selectedGift?.title || "",
      `${currencySymbol} ${contributionAmount}`,
      guestMessage.trim()
    );
    setView("thank-you");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ─── THANK YOU PAGE ─── */
  if (view === "thank-you") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-lg text-center space-y-6">
          <div className="text-7xl mb-2">🤍</div>
          <h1 className="text-4xl md:text-5xl font-semibold text-[#84814E]">
            ¡Muchas gracias!
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tu regalo nos acerca un paso más a nuestra luna de miel soñada.
            Estamos muy agradecidos por tu generosidad y por acompañarnos en
            este momento tan especial.
          </p>
          <p className="text-base text-muted-foreground">
            Con amor,
            <br />
            <span className="font-semibold text-foreground text-lg italic">
              Karina & Juan
            </span>
          </p>
          <Separator className="my-4" />
          <Button
            variant="outline"
            onClick={() => {
              setView("home");
              setSelectedGift(null);
            }}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la lista de regalos
          </Button>
        </div>
      </div>
    );
  }

  /* ─── GIFT DETAIL PAGE ─── */
  if (view === "gift-detail" && selectedGift) {
    const totalFunded = getFunded(selectedGift);
    const remaining = Math.max(
      selectedGift.totalPrice - totalFunded,
      0
    );
    const percent = Math.min(
      (totalFunded / selectedGift.totalPrice) * 100,
      100
    );
    const quickAmountsByCurrency: Record<string, number[]> = {
      USD: [50, 100, 200, 500],
      ARS: [50000, 100000, 200000, 500000],
      MXN: [1000, 2000, 5000, 10000],
    };
    const currencyLabels: Record<string, string> = {
      USD: "USD 🇺🇸",
      ARS: "ARS 🇦🇷",
      MXN: "MXN 🇲🇽",
    };
    const quickAmounts = (quickAmountsByCurrency[selectedCurrency] || quickAmountsByCurrency.USD);

    const stepLabels = ["Monto y datos", "Transferir", "Avisar"];

    return (
      <div className="min-h-screen pb-28">
        {/* Header image */}
        <div className="relative h-56 md:h-72 overflow-hidden">
          <img
            src={selectedGift.image}
            alt={selectedGift.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button
            onClick={() => {
              setView("home");
              setSelectedGift(null);
            }}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs mb-2">
              {selectedGift.location}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-semibold drop-shadow-sm">
              {selectedGift.title}
            </h1>
          </div>
        </div>

        {/* Step indicator */}
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
          <div className="flex items-center justify-between">
            {stepLabels.map((label, i) => {
              const stepNum = (i + 1) as GiftStep;
              const isActive = giftStep === stepNum;
              const isDone = giftStep > stepNum;
              return (
                <div key={label} className="flex-1 flex flex-col items-center relative">
                  {i > 0 && (
                    <div
                      className={`absolute top-4 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                        isDone || isActive ? "bg-[#84814E]" : "bg-border"
                      }`}
                    />
                  )}
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      isDone
                        ? "bg-[#84814E] text-white"
                        : isActive
                        ? "bg-[#84814E] text-white ring-4 ring-[#84814E]/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  <span
                    className={`text-xs mt-1.5 font-medium ${
                      isActive || isDone ? "text-[#84814E]" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div ref={stepRef} className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* ─── STEP 1: Amount + Guest info ─── */}
          {giftStep === 1 && (
            <>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {selectedGift.description}
              </p>

              {/* Progress */}
              <div className="space-y-3 bg-white p-5 rounded-lg border">
                <div className="flex justify-between text-sm">
                  <span>
                    Recaudado:{" "}
                    <span className="font-semibold">
                      USD {totalFunded.toLocaleString()}
                    </span>
                  </span>
                  <span>
                    Meta:{" "}
                    <span className="font-semibold">
                      USD {selectedGift.totalPrice.toLocaleString()}
                    </span>
                  </span>
                </div>
                <Progress value={percent} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Faltan{" "}
                  <span className="font-semibold text-foreground">
                    USD {remaining.toLocaleString()}
                  </span>{" "}
                  para completar esta experiencia
                </p>
              </div>

              <Separator />

              <div className="space-y-5">
                <h2 className="text-2xl font-semibold">¿Cuánto querés aportar?</h2>

                {/* Currency selector */}
                <div className="space-y-1.5">
                  <Label className="text-sm">Elegí tu moneda</Label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(currencyLabels).map(([code, label]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setSelectedCurrency(code);
                          setContributionAmount("");
                        }}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                          selectedCurrency === code
                            ? "bg-[#84814E] text-white border-[#84814E]"
                            : "bg-white hover:bg-muted border-border"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick amounts */}
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setContributionAmount(String(amt))}
                      className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        contributionAmount === String(amt)
                          ? "bg-[#ad4646] text-white border-[#ad4646]"
                          : "bg-white hover:bg-muted border-border"
                      }`}
                    >
                      {selectedCurrency} {amt.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="space-y-1.5">
                  <Label htmlFor="custom-amount" className="text-sm">
                    O ingresá otro monto ({selectedCurrency})
                  </Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    min={1}
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    placeholder={`Monto en ${selectedCurrency}`}
                    className="bg-white"
                  />
                </div>

                <Separator />

                {/* Guest info */}
                <h2 className="text-2xl font-semibold">Tus datos</h2>
                <p className="text-sm text-muted-foreground -mt-3">
                  Para que sepamos quién nos regaló y podamos agradecerte.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="guest-name">Nombre completo *</Label>
                    <Input
                      id="guest-name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Tu nombre"
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="guest-email">Email *</Label>
                    <Input
                      id="guest-email"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="guest-message">
                    Mensaje para los novios (opcional)
                  </Label>
                  <textarea
                    id="guest-message"
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="¡Felicidades! Disfruten su viaje..."
                    rows={3}
                    className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
            </>
          )}

          {/* ─── STEP 2: Bank accounts ─── */}
          {giftStep === 2 && (
            <>
              <div className="bg-white border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  Estás aportando{" "}
                  <span className="font-semibold text-foreground">
                    {selectedCurrency} {Number(contributionAmount).toLocaleString()}
                  </span>{" "}
                  para <span className="italic font-medium text-foreground">{selectedGift.title}</span>
                </p>
              </div>

              <h2 className="text-2xl font-semibold">Elegí una cuenta y transferí</h2>
              <p className="text-sm text-muted-foreground -mt-4">
                Usá la cuenta que te quede más cómoda. Podés copiar cada dato tocándolo.
              </p>

              <div className="space-y-4">
                {[...BANK_ACCOUNTS]
                  .sort((a, b) => {
                    const priority = (acc: BankAccount) => {
                      if (acc.currencyCode !== selectedCurrency) return 3;
                      if (acc.flag === "🇺🇸") return 0;
                      if (acc.flag === "🇦🇷" && acc.currencyCode === "USD") return 1;
                      return 0;
                    };
                    return priority(a) - priority(b);
                  })
                  .map((acc, i) => (
                    <div
                      key={`${acc.currencyCode}-${i}`}
                      className={acc.currencyCode === selectedCurrency ? "ring-2 ring-[#84814E] rounded-lg" : "opacity-50"}
                    >
                      <BankAccountCard account={acc} />
                    </div>
                  ))}
              </div>

              <button
                onClick={() => setGiftStep(1)}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver a editar monto o datos
              </button>
            </>
          )}

          {/* ─── STEP 3: Notify ─── */}
          {giftStep === 3 && (
            <div className="text-center space-y-6 py-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="text-4xl mb-3">🎉</div>
                <h2 className="text-2xl font-semibold text-green-800 mb-1">
                  ¡Transferencia registrada!
                </h2>
                <p className="text-green-700 text-sm">
                  Gracias por tu aporte de{" "}
                  <span className="font-semibold">
                    {selectedCurrency} {Number(contributionAmount).toLocaleString()}
                  </span>{" "}
                  para <span className="italic">{selectedGift.title}</span>.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">
                  Último paso: avisanos por WhatsApp o email
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Así sabemos que ya hiciste la transferencia y podemos agradecerte.
                </p>
              </div>

              <div className="space-y-3 max-w-sm mx-auto">
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2 text-base h-14"
                  onClick={handleWhatsAppKari}
                >
                  <Send className="w-5 h-5" />
                  WhatsApp a Kari
                </Button>
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2 text-base h-14"
                  onClick={handleWhatsAppJuan}
                >
                  <Send className="w-5 h-5" />
                  WhatsApp a Juan
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 text-base h-14"
                  onClick={handleEmail}
                >
                  <Mail className="w-5 h-5" />
                  Enviar por Email
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* ─── Sticky bottom CTA ─── */}
        {giftStep === 1 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t shadow-lg p-4 z-50">
            <div className="max-w-2xl mx-auto">
              <Button
                size="lg"
                className="w-full bg-[#ad4646] hover:bg-[#963c3c] text-white text-base gap-2 h-14"
                onClick={handleGoToStep2}
                disabled={
                  !guestName.trim() ||
                  !guestEmail.trim() ||
                  !contributionAmount ||
                  Number(contributionAmount) <= 0
                }
              >
                Ver datos para transferir
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            </div>
          </div>
        )}

        {giftStep === 2 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t shadow-lg p-4 z-50">
            <div className="max-w-2xl mx-auto">
              <Button
                size="lg"
                className="w-full bg-[#ad4646] hover:bg-[#963c3c] text-white gap-2 text-base h-14"
                onClick={handleConfirmTransfer}
              >
                <Check className="w-5 h-5" />
                Ya realicé la transferencia
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─── HOME PAGE ─── */
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=1600&h=900&fit=crop"
          alt="Playa mediterránea"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-light opacity-90">
            Nos casamos
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-3 leading-tight">
            Karina{" "}
            <span className="font-light italic opacity-80">&</span>{" "}
            Juan
          </h1>
          <Separator className="w-16 mx-auto my-5 bg-white/40" />
          <p className="text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto opacity-90">
            Nuestra luna de miel soñada: playas e islas de Grecia, Italia y
            España. Gracias por ayudarnos a hacerla realidad.
          </p>
          <Button
            onClick={scrollToGifts}
            size="lg"
            className="mt-8 bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 text-base px-8 gap-2"
          >
            Ver lista de regalos
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Intro section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <Heart className="w-8 h-8 mx-auto text-[#ad4646] mb-2" />
          <h2 className="text-3xl md:text-4xl font-semibold text-[#84814E]">
            Regalanos experiencias
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            En vez de regalos tradicionales, preferimos vivir momentos
            inolvidables juntos. Cada aporte, grande o chico, nos acerca a una
            experiencia única en el Mediterráneo. Elegí la que más te guste y
            aportá lo que quieras.
          </p>
        </div>
      </section>

      {/* Gift grid */}
      <section ref={giftsRef} className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GIFTS.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                onSelect={handleSelectGift}
                extraFunded={contributions[gift.id] || 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 text-center text-sm text-muted-foreground space-y-2 px-4">
        <p className="text-lg italic font-serif text-foreground">
          Karina & Juan
        </p>
        <p>
          Cualquier duda, escribinos por WhatsApp:{" "}
          <a
            href={`https://wa.me/${WHATSAPP_KARI}`}
            className="underline hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener"
          >
            Kari
          </a>
          {" · "}
          <a
            href={`https://wa.me/${WHATSAPP_JUAN}`}
            className="underline hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener"
          >
            Juan
          </a>
        </p>
        <p className="text-xs opacity-70 pt-4">
          Hecho con amor para nuestra luna de miel — 2026
        </p>
      </footer>
    </div>
  );
}
