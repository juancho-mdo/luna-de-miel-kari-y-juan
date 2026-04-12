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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Hotel,
  UtensilsCrossed,
  Sailboat,
  Palmtree,
  Camera,
  Wine,
  Sparkles,
  Heart,
  MapPin,
  ChevronDown,
  Copy,
  Check,
  ArrowLeft,
  Send,
  Mail,
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
    title: "Vuelos internacionales",
    description:
      "Llevanos volando desde Buenos Aires a las costas del Mediterráneo. Vuelos ida y vuelta para los dos.",
    totalPrice: 3200,
    funded: 0,
    icon: <Plane className="w-6 h-6" />,
    location: "Buenos Aires → Atenas",
    image:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&h=400&fit=crop",
  },
  {
    id: "santorini",
    title: "3 noches en Santorini",
    description:
      "Hotel con vista a la caldera, atardeceres inolvidables en Oia y explorar las playas de arena volcánica.",
    totalPrice: 1800,
    funded: 0,
    icon: <Hotel className="w-6 h-6" />,
    location: "Santorini, Grecia",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop",
  },
  {
    id: "mykonos",
    title: "2 noches en Mykonos",
    description:
      "Callejuelas blancas, playas cristalinas y la mejor vida nocturna de las islas griegas.",
    totalPrice: 1200,
    funded: 0,
    icon: <Palmtree className="w-6 h-6" />,
    location: "Mykonos, Grecia",
    image:
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&h=400&fit=crop",
  },
  {
    id: "costaamalfitana",
    title: "Costa Amalfitana",
    description:
      "Recorrer Positano, Ravello y Amalfi. Paseos en bote, limoncello casero y los acantilados más lindos de Italia.",
    totalPrice: 1500,
    funded: 0,
    icon: <Sailboat className="w-6 h-6" />,
    location: "Costa Amalfitana, Italia",
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&h=400&fit=crop",
  },
  {
    id: "roma",
    title: "3 noches en Roma",
    description:
      "El Coliseo, el Vaticano, Trastevere al atardecer, pasta fresca y gelato sin límites.",
    totalPrice: 1400,
    funded: 0,
    icon: <Camera className="w-6 h-6" />,
    location: "Roma, Italia",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop",
  },
  {
    id: "barcelona",
    title: "3 noches en Barcelona",
    description:
      "La Sagrada Familia, el Barrio Gótico, Las Ramblas, tapas y cava con vista al mar.",
    totalPrice: 1300,
    funded: 0,
    icon: <MapPin className="w-6 h-6" />,
    location: "Barcelona, España",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop",
  },
  {
    id: "cenas",
    title: "Cenas románticas",
    description:
      "Cenas especiales en restaurantes con vista al mar en cada destino. Cocina mediterránea, vinos locales y noches mágicas.",
    totalPrice: 800,
    funded: 0,
    icon: <UtensilsCrossed className="w-6 h-6" />,
    location: "Cada destino",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  },
  {
    id: "vinos",
    title: "Tour de vinos en la Toscana",
    description:
      "Un día recorriendo viñedos en la campiña toscana, degustando Chianti, Brunello y aceite de oliva fresco.",
    totalPrice: 500,
    funded: 0,
    icon: <Wine className="w-6 h-6" />,
    location: "Toscana, Italia",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop",
  },
  {
    id: "spa",
    title: "Día de spa para dos",
    description:
      "Un día de relax total con masajes, tratamientos y piscina con vista al Egeo. Lo merecemos.",
    totalPrice: 400,
    funded: 0,
    icon: <Sparkles className="w-6 h-6" />,
    location: "Santorini, Grecia",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop",
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
];

const WHATSAPP_KARI = "5491169027629";
const WHATSAPP_JUAN = "525540043162";
const NOTIFICATION_EMAIL = "karinavrossini@gmail.com";

/* ───────────────────────────── COMPONENTS ───────────────────────────── */

type AppView = "home" | "gift-detail" | "thank-you";

function GiftCard({
  gift,
  onSelect,
}: {
  gift: GiftItem;
  onSelect: (g: GiftItem) => void;
}) {
  const percent = Math.min((gift.funded / gift.totalPrice) * 100, 100);
  const remaining = Math.max(gift.totalPrice - gift.funded, 0);

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
          <span className="text-[hsl(207,44%,38%)]">{gift.icon}</span>
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
                USD {gift.funded.toLocaleString()}
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
          className="w-full bg-[hsl(207,44%,38%)] hover:bg-[hsl(207,44%,30%)] text-white"
          disabled={remaining <= 0}
        >
          {remaining > 0 ? "Quiero regalar esto" : "Completado"}
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
    `¡Hola Juan y Karina!\n\n${guestName} les dejó un regalo:\n\nExperiencia: ${giftTitle}\nMonto: USD ${amount}\nEmail: ${guestEmail}\n${message ? `Mensaje: ${message}\n` : ""}\n¡Felicidades!`
  );
  window.open(
    `mailto:${NOTIFICATION_EMAIL}?subject=${subject}&body=${body}`,
    "_blank"
  );
}

/* ───────────────────────────── APP ───────────────────────────── */

export default function App() {
  const [view, setView] = useState<AppView>("home");
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [showBankModal, setShowBankModal] = useState(false);
  const [contributionAmount, setContributionAmount] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const giftsRef = useRef<HTMLDivElement>(null);

  const scrollToGifts = () => {
    giftsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectGift = (gift: GiftItem) => {
    setSelectedGift(gift);
    setContributionAmount("");
    setGuestName("");
    setGuestEmail("");
    setGuestMessage("");
    setView("gift-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowBankInfo = () => {
    if (!guestName.trim() || !guestEmail.trim() || !contributionAmount) return;
    setShowBankModal(true);
  };

  const buildWhatsAppMsg = () => {
    const amount = contributionAmount;
    return encodeURIComponent(
      `¡Hola Juan y Karina! 🎉\n\nSoy ${guestName.trim()} y les quiero regalar *${selectedGift?.title}*.\n\nMonto: USD ${amount}\n${guestMessage.trim() ? `Mensaje: ${guestMessage.trim()}\n` : ""}\nMi email: ${guestEmail.trim()}\n\n¡Ya hice la transferencia! 🎁`
    );
  };

  const handleWhatsAppKari = () => {
    window.open(`https://wa.me/${WHATSAPP_KARI}?text=${buildWhatsAppMsg()}`, "_blank");
    setShowBankModal(false);
    setView("thank-you");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppJuan = () => {
    window.open(`https://wa.me/${WHATSAPP_JUAN}?text=${buildWhatsAppMsg()}`, "_blank");
    setShowBankModal(false);
    setView("thank-you");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmail = () => {
    sendEmailNotification(
      guestName.trim(),
      guestEmail.trim(),
      selectedGift?.title || "",
      contributionAmount,
      guestMessage.trim()
    );
    setShowBankModal(false);
    setView("thank-you");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ─── THANK YOU PAGE ─── */
  if (view === "thank-you") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-lg text-center space-y-6">
          <div className="text-7xl mb-2">🤍</div>
          <h1 className="text-4xl md:text-5xl font-semibold text-[hsl(207,44%,38%)]">
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
              Juan & Karina
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
    const remaining = Math.max(
      selectedGift.totalPrice - selectedGift.funded,
      0
    );
    const percent = Math.min(
      (selectedGift.funded / selectedGift.totalPrice) * 100,
      100
    );
    const quickAmounts = [50, 100, 200, 500].filter((a) => a <= remaining);

    return (
      <div className="min-h-screen">
        {/* Header image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
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

        <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed">
            {selectedGift.description}
          </p>

          {/* Progress */}
          <div className="space-y-3 bg-white p-5 rounded-lg border">
            <div className="flex justify-between text-sm">
              <span>
                Recaudado:{" "}
                <span className="font-semibold">
                  USD {selectedGift.funded.toLocaleString()}
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

          {/* Contribution form */}
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold">¿Cuánto querés aportar?</h2>

            {/* Quick amounts */}
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setContributionAmount(String(amt))}
                  className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    contributionAmount === String(amt)
                      ? "bg-[hsl(207,44%,38%)] text-white border-[hsl(207,44%,38%)]"
                      : "bg-white hover:bg-muted border-border"
                  }`}
                >
                  USD {amt}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="space-y-1.5">
              <Label htmlFor="custom-amount" className="text-sm">
                O ingresá otro monto (USD)
              </Label>
              <Input
                id="custom-amount"
                type="number"
                min={1}
                max={remaining}
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                placeholder={`Máximo USD ${remaining}`}
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

            <Button
              size="lg"
              className="w-full bg-[hsl(24,60%,56%)] hover:bg-[hsl(24,60%,48%)] text-white text-base gap-2"
              onClick={handleShowBankInfo}
              disabled={
                !guestName.trim() ||
                !guestEmail.trim() ||
                !contributionAmount ||
                Number(contributionAmount) <= 0
              }
            >
              Ver datos para transferir
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bank info modal */}
        <Dialog open={showBankModal} onOpenChange={setShowBankModal}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Datos para transferir
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Elegí la cuenta que te quede más cómoda según tu moneda. Estás
              aportando{" "}
              <span className="font-semibold text-foreground">
                USD {Number(contributionAmount).toLocaleString()}
              </span>{" "}
              para <span className="italic">{selectedGift.title}</span>.
            </p>

            <div className="space-y-4 mt-2">
              {BANK_ACCOUNTS.map((acc) => (
                <BankAccountCard key={acc.currencyCode} account={acc} />
              ))}
            </div>

            <Separator className="my-2" />

            <p className="text-sm text-muted-foreground">
              Una vez que hayas hecho la transferencia, avisanos por alguna de
              estas vías:
            </p>

            <div className="space-y-2">
              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2 text-base"
                onClick={handleWhatsAppKari}
              >
                <Send className="w-5 h-5" />
                WhatsApp a Kari
              </Button>
              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2 text-base"
                onClick={handleWhatsAppJuan}
              >
                <Send className="w-5 h-5" />
                WhatsApp a Juan
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full gap-2 text-base"
                onClick={handleEmail}
              >
                <Mail className="w-5 h-5" />
                Enviar por Email
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
            Juan{" "}
            <span className="font-light italic opacity-80">&</span>{" "}
            Karina
          </h1>
          <Separator className="w-16 mx-auto my-5 bg-white/40" />
          <p className="text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto opacity-90">
            Nuestra luna de miel soñada: playas e islas de Grecia, Italia y
            España. Ayudanos a hacerla realidad.
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
          <Heart className="w-8 h-8 mx-auto text-[hsl(24,60%,56%)] mb-2" />
          <h2 className="text-3xl md:text-4xl font-semibold text-[hsl(207,44%,38%)]">
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 text-center text-sm text-muted-foreground space-y-2 px-4">
        <p className="text-lg italic font-serif text-foreground">
          Juan & Karina
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
