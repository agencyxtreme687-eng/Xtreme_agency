export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export const products: Product[] = [
  // Cartões de Visita (Frente e Verso)
  {
    id: "cv-1000-fv",
    name: "Cartão de Visita: 1.000 unidades (frente e verso)",
    description: "Cartão de alta qualidade profissional para seu próximo grande contato.",
    price: 200.00,
    category: "Impressos",
    image: "/src/assets/images/regenerated_image_1777828421634.png"
  },
  {
    id: "cv-500-fv",
    name: "Cartão de Visita: 500 unidades (frente e verso)",
    description: "Cartão de alta qualidade profissional para seu próximo grande contato.",
    price: 150.00,
    category: "Impressos",
    image: "/src/assets/images/regenerated_image_1777828439187.png"
  },
  {
    id: "cv-250-fv",
    name: "Cartão de Visita: 250 unidades (frente e verso)",
    description: "Cartão de alta qualidade profissional para seu próximo grande contato.",
    price: 100.00,
    category: "Impressos",
    image: "/src/assets/images/regenerated_image_1777828465408.png"
  },
  {
    id: "cv-100-fv",
    name: "Cartão de Visita: 100 unidades (frente e verso)",
    description: "Cartão de alta qualidade profissional para seu próximo grande contato.",
    price: 60.00,
    category: "Impressos",
    image: "/src/assets/images/regenerated_image_1777828449084.png"
  },

  // Cartões de Visita (Somente Frente)
  {
    id: "cv-1000-f",
    name: "Cartão de Visita: 1.000un (Somente Frente)",
    description: "Modelo econômico mantendo o impacto visual.",
    price: 160.00,
    category: "Impressos",
    image: "/src/assets/images/regenerated_image_1777828475106.png"
  },
  {
    id: "cv-500-f",
    name: "Cartão de Visita: 500un (Somente Frente)",
    description: "Modelo econômico mantendo o impacto visual.",
    price: 110.00,
    category: "Impressos",
    image: "/src/assets/images/regenerated_image_1777828483052.png"
  },
  {
    id: "cv-250-f",
    name: "Cartão de Visita: 250un (Somente Frente)",
    description: "Modelo econômico mantendo o impacto visual.",
    price: 70.00,
    category: "Impressos",
    image: "/src/assets/images/regenerated_image_1777828492185.png"
  },
  {
    id: "cv-100-f",
    name: "Cartão de Visita: 100un (Somente Frente)",
    description: "Modelo econômico mantendo o impacto visual.",
    price: 40.00,
    category: "Impressos",
    image: "/src/assets/images/regenerated_image_1777828506313.png"
  },

  // Panfletos / Flyers
  {
    id: "flyer-1000",
    name: "Flyer / Panfleto - 1.000 unidades",
    description: "Divulgue seu negócio de forma profissional e impactante.",
    price: 160.00,
    category: "Impressos",
    image: "/src/assets/images/regenerated_image_1777829918511.png"
  },
  {
    id: "flyer-500",
    name: "Flyer / Panfleto - 500 unidades",
    description: "Divulgue seu negócio de forma profissional e impactante.",
    price: 100.00,
    category: "Impressos",
    image: "/src/assets/images/regenerated_image_1777829922328.png"
  },

  // Personalizados
  {
    id: "caneca",
    name: "Caneca Personalizada",
    description: "Transforme momentos simples em memórias especiais.",
    price: 35.00,
    category: "Produtos",
    image: "/src/assets/images/regenerated_image_1777828552993.png"
  },
  {
    id: "squeeze",
    name: "Squeeze Alumínio 500ml",
    description: "Ideal para quem busca praticidade e estilo no dia a dia.",
    price: 40.00,
    category: "Produtos",
    image: "/src/assets/images/regenerated_image_1777829928908.png"
  },
  {
    id: "camiseta-empresa",
    name: "Camiseta Personalizada Empresarial",
    description: "Fortaleça a identidade da sua empresa com uniformes de qualidade.",
    price: 60.00,
    category: "Produtos",
    image: "/src/assets/images/regenerated_image_1777829933279.png"
  },

  // Serviços de Design (Somente Arte)
  {
    id: "logo-3d",
    name: "Logotipo em 3D (Somente Arte)",
    description: "Transforme sua marca em uma identidade visual moderna.",
    price: 30.00,
    category: "Design Digital",
    image: "/src/assets/images/regenerated_image_1777829931093.png"
  },
  {
    id: "criacao-logo",
    name: "Criação de Logotipo (Somente Arte)",
    description: "Desenvolvimento de identidade visual profissional.",
    price: 50.00,
    category: "Design Digital",
    image: "/src/assets/images/regenerated_image_1777829935589.png"
  },
  {
    id: "arte-cv",
    name: "Cartão de Visita (Somente Arte)",
    description: "Criação de design profissional para seu cartão.",
    price: 30.00,
    category: "Design Digital",
    image: "/src/assets/images/regenerated_image_1777828519812.png"
  },
  {
    id: "arte-flyer",
    name: "Flyer / Panfleto (Somente Arte)",
    description: "Design criativo para divulgação impressa ou digital.",
    price: 40.00,
    category: "Design Digital",
    image: "/src/assets/images/regenerated_image_1777828537942.png"
  },
  {
    id: "arte-cardapio",
    name: "Cardápio Personalizado (Somente Arte)",
    description: "Criação de design profissional para seu estabelecimento.",
    price: 60.00,
    category: "Design Digital",
    image: "/src/assets/images/regenerated_image_1777828551211.png"
  },

  // Outros
  {
    id: "cracha-fisico",
    name: "Crachá (Produto Físico)",
    description: "Crachá com impressão de alta qualidade e durabilidade.",
    price: 60.00,
    category: "Impressos",
    image: "/cracha_personalizado.jpg"
  },
  {
    id: "cracha-arte",
    name: "Crachá (Somente Arte)",
    description: "Criação de design personalizado para identificação.",
    price: 30.00,
    category: "Design Digital",
    image: "/cracha_personalizado.jpg"
  },
  {
    id: "qr-fisico-3",
    name: "QR Code Personalizado 3 unidades (Produto Físico)",
    description: "Kit com 3 unidades do seu QR Code prontos para uso físico (PIX, Wi-Fi, etc).",
    price: 100.00,
    category: "Impressos",
    image: "/qr_code_3_unidades.jpg"
  },
  {
    id: "qr-fisico",
    name: "QR Code Personalizado (Produto Físico)",
    description: "Tenha seu QR Code pronto para uso físico.",
    price: 40.00,
    category: "Impressos",
    image: "/qr_code_1_unidade.jpg"
  },
  {
    id: "qr-arte",
    name: "QR Code Personalizado (Somente Arte)",
    description: "Facilite o acesso dos seus clientes ao seu PIX, Wi-Fi ou Site.",
    price: 20.00,
    category: "Design Digital",
  },
  {
    id: "cardapio-fisico",
    name: "Cardápio Personalizado (Produto Físico)",
    description: "Receba seu cardápio pronto para uso no seu negócio.",
    price: 100.00,
    category: "Impressos",
    image: "/src/assets/images/regenerated_image_1777828548124.png"
  },
];
