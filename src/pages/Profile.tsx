
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentCard from "@/components/PaymentCard";
import { plans } from "@/data/plans";

export default function Profile() {
  const { auth } = useApp();
  const [activeTab, setActiveTab] = useState("account");
  const [formData, setFormData] = useState({
    name: auth.user?.name || "",
    email: auth.user?.email || "",
  });

  // Get current user's plan (for demo, assume it's Premium)
  const userPlan = plans.find(plan => plan.id === "premium-plan");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Would normally save to backend
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully."
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-sampflix-purple">My Profile</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="account" className="data-[state=active]:bg-sampflix-purple">
              Account
            </TabsTrigger>
            <TabsTrigger value="subscription" className="data-[state=active]:bg-sampflix-purple">
              Subscription
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-sampflix-purple">
              Billing
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-sampflix-dark-purple border-sampflix-purple/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-sampflix-purple">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${auth.user?.name || "user"}`} />
                    <AvatarFallback>{auth.user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-xl">{auth.user?.name || "User"}</div>
                    <div className="text-sm text-gray-400">{auth.user?.email || "user@example.com"}</div>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name} 
                    onChange={handleInputChange}
                    className="bg-sampflix-dark-purple border-sampflix-purple/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    className="bg-sampflix-dark-purple border-sampflix-purple/30 text-white"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveProfile}
                  className="sampflix-button animate-glow"
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-sampflix-dark-purple border-sampflix-purple/20">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize your viewing experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoplay">Autoplay next episode</Label>
                  <Switch id="autoplay" defaultChecked />
                </div>
                <Separator className="bg-sampflix-purple/20" />
                <div className="flex items-center justify-between">
                  <Label htmlFor="previews">Play previews while browsing</Label>
                  <Switch id="previews" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription" className="space-y-6">
            <Card className="bg-sampflix-dark-purple border-sampflix-purple/20">
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription className="text-gray-400">
                  You are currently on the {userPlan?.name || "Premium"} plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-sampflix-dark-purple border border-sampflix-purple/30">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-sampflix-purple">{userPlan?.name || "Premium"}</h3>
                      <p className="text-2xl font-bold">{userPlan?.price || "$9.99"}<span className="text-sm font-normal text-gray-400">/month</span></p>
                    </div>
                    {userPlan?.isPopular && (
                      <div className="bg-sampflix-bright-blue px-3 py-1 rounded-full text-xs font-medium">
                        Current Plan
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-2">
                    {userPlan?.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-sampflix-purple mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="border-sampflix-purple text-sampflix-purple hover:bg-sampflix-purple hover:text-white">
                  Cancel Plan
                </Button>
                <Button className="sampflix-button">
                  Change Plan
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-sampflix-dark-purple border-sampflix-purple/20">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your payment information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-full max-w-lg mx-auto">
                  <PaymentCard 
                    cardType="visa" 
                    lastFour="4242" 
                    expiryDate="09/25" 
                    className="mb-6 transform transition-transform hover:scale-105" 
                  />
                </div>
                <Button className="w-full sampflix-button">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-sampflix-dark-purple border-sampflix-purple/20">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription className="text-gray-400">
                  View your recent transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Apr 15, 2025", amount: "$9.99", status: "Paid" },
                    { date: "Mar 15, 2025", amount: "$9.99", status: "Paid" },
                    { date: "Feb 15, 2025", amount: "$9.99", status: "Paid" }
                  ].map((invoice, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-sampflix-dark-purple/50 rounded-md border border-sampflix-purple/10 hover:border-sampflix-purple/30 transition-colors">
                      <div>
                        <p className="font-medium">{invoice.date}</p>
                        <p className="text-sm text-gray-400">Premium Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{invoice.amount}</p>
                        <span className="inline-block px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs">
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
