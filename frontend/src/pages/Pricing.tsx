import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, Crown } from 'lucide-react';
import { useCredits } from '@/contexts/CreditContext';

const creditPacks = [
  {
    id: 'starter',
    name: 'Pack Starter',
    credits: 5,
    price: 2,
    description: 'Parfait pour commencer',
    icon: Zap,
    popular: false,
    features: [
      '5 générations de playlists',
      'Algorithmes IA avancés',
      'Support client'
    ]
  },
  {
    id: 'pro',
    name: 'Pack Pro',
    credits: 15,
    price: 5,
    description: 'Le plus populaire',
    icon: Star,
    popular: true,
    features: [
      '15 générations de playlists',
      'Algorithmes IA avancés',
      'Support client prioritaire',
      'Suggestions personnalisées'
    ]
  },
  {
    id: 'premium',
    name: 'Pack Premium',
    credits: 30,
    price: 9,
    description: 'Pour les mélomanes',
    icon: Crown,
    popular: false,
    features: [
      '30 générations de playlists',
      'Algorithmes IA avancés',
      'Support client prioritaire',
      'Suggestions personnalisées',
      'Accès aux nouvelles fonctionnalités'
    ]
  }
];

const Pricing = () => {
  const { credits } = useCredits();

  const handlePurchase = (packId: string) => {
    // TODO: Intégration Stripe à venir
    console.log(`Achat du pack ${packId}`);
    alert('Intégration Stripe à venir !');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Choisissez votre pack de crédits</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Générez autant de playlists que vous le souhaitez
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Crédits actuels: {credits}
          </Badge>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {creditPacks.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {pack.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Le plus populaire
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full ${pack.popular ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <pack.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{pack.name}</CardTitle>
                  <CardDescription>{pack.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{pack.price}€</span>
                    <span className="text-muted-foreground"> / {pack.credits} crédits</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {pack.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handlePurchase(pack.id)}
                    className="w-full"
                    variant={pack.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    Acheter avec Stripe
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Paiement sécurisé avec Stripe • Satisfaction garantie • Support client 24/7
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;