
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Settings() {
  const { auth } = useApp();
  const [activeTab, setActiveTab] = useState("playback");

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully."
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-sampflix-purple">Settings</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="playback" className="data-[state=active]:bg-sampflix-purple">
              Playback
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-sampflix-purple">
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-sampflix-purple">
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="playback" className="space-y-6">
            <Card className="bg-sampflix-dark-purple border-sampflix-purple/20">
              <CardHeader>
                <CardTitle>Playback Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Control how content plays on your devices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="quality">Default Video Quality</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger className="bg-sampflix-dark-purple border-sampflix-purple/30 text-white">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent className="bg-sampflix-dark-purple border-sampflix-purple/30 text-white">
                      <SelectItem value="auto">Auto (Recommended)</SelectItem>
                      <SelectItem value="low">Low (Save Data)</SelectItem>
                      <SelectItem value="medium">Medium (720p)</SelectItem>
                      <SelectItem value="high">High (1080p)</SelectItem>
                      <SelectItem value="ultra">Ultra HD (4K)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <Label htmlFor="playbackSpeed">Playback Speed</Label>
                    <span className="text-sm text-gray-400">1.0x</span>
                  </div>
                  <Slider
                    defaultValue={[10]}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0.5x</span>
                    <span>1.0x</span>
                    <span>1.5x</span>
                    <span>2.0x</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoplay">Autoplay next episode</Label>
                    <Switch id="autoplay" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="previews">Play previews while browsing</Label>
                    <Switch id="previews" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mute-ads">Mute advertisements</Label>
                    <Switch id="mute-ads" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveSettings}
                  className="sampflix-button animate-glow"
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-sampflix-dark-purple border-sampflix-purple/20">
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription className="text-gray-400">
                  Change your account password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input 
                    id="current" 
                    type="password" 
                    placeholder="••••••••"
                    className="bg-sampflix-dark-purple border-sampflix-purple/30 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input 
                    id="new" 
                    type="password" 
                    placeholder="••••••••" 
                    className="bg-sampflix-dark-purple border-sampflix-purple/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input 
                    id="confirm" 
                    type="password" 
                    placeholder="••••••••" 
                    className="bg-sampflix-dark-purple border-sampflix-purple/30 text-white"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="sampflix-button animate-glow">
                  Update Password
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-sampflix-dark-purple border-sampflix-purple/20">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription className="text-gray-400">
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Protect your account with an additional verification step</p>
                  </div>
                  <Switch id="2fa" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-sampflix-dark-purple border-sampflix-purple/20">
              <CardHeader>
                <CardTitle>Device Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage devices connected to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "MacBook Pro", location: "New York, US", active: true, last: "Now" },
                  { name: "iPhone 13", location: "New York, US", active: false, last: "2 days ago" },
                  { name: "Samsung TV", location: "New York, US", active: false, last: "1 week ago" }
                ].map((device, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-sampflix-dark-purple/50 rounded-md border border-sampflix-purple/10 hover:border-sampflix-purple/30 transition-colors">
                    <div>
                      <div className="font-medium flex items-center">
                        {device.name}
                        {device.active && (
                          <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{device.location} • {device.last}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                      Sign Out
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-red-500 hover:text-white hover:bg-red-500/80 border-red-500/50">
                  Sign Out of All Devices
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-sampflix-dark-purple border-sampflix-purple/20">
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription className="text-gray-400">
                  Control what emails you receive from us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Releases</p>
                    <p className="text-sm text-gray-400">Get notified about new movies and shows</p>
                  </div>
                  <Switch id="email-releases" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Recommendations</p>
                    <p className="text-sm text-gray-400">Weekly personalized recommendations</p>
                  </div>
                  <Switch id="email-recommendations" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Account Updates</p>
                    <p className="text-sm text-gray-400">Important information about your account</p>
                  </div>
                  <Switch id="email-account" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Special Offers</p>
                    <p className="text-sm text-gray-400">Discounts and promotional offers</p>
                  </div>
                  <Switch id="email-offers" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-sampflix-dark-purple border-sampflix-purple/20">
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure mobile app notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Content Alerts</p>
                    <p className="text-sm text-gray-400">When new episodes of your shows are available</p>
                  </div>
                  <Switch id="push-content" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Continue Watching Reminders</p>
                    <p className="text-sm text-gray-400">Remind you to continue watching shows you've started</p>
                  </div>
                  <Switch id="push-continue" />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveSettings}
                  className="sampflix-button animate-glow"
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
