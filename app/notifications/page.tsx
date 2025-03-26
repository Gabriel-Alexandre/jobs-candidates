'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  Mail,
  MessageSquare,
  Briefcase,
  User,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';
import { mockNotifications } from '@/lib/data/mock-data';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'application':
      return <Briefcase className="h-4 w-4" />;
    case 'interview':
      return <Calendar className="h-4 w-4" />;
    case 'offer':
      return <CheckCircle2 className="h-4 w-4" />;
    case 'message':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-500 dark:text-red-400';
    case 'medium':
      return 'text-orange-500 dark:text-orange-400';
    default:
      return 'text-muted-foreground';
  }
};

export default function NotificationsPage() {
  const { t } = useTranslation();
  const { role } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    messages: true,
    marketing: false,
  });

  const [pushNotifications, setPushNotifications] = useState({
    newJobs: true,
    applicationStatus: true,
    messages: true,
    systemUpdates: true,
  });

  const roleSpecificNotifications = mockNotifications.filter(n => n.role === role);
  const unreadNotifications = roleSpecificNotifications.filter(n => !n.read);
  const readNotifications = roleSpecificNotifications.filter(n => n.read);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button variant="outline" onClick={() => console.log('Mark all as read')}>
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All
            <Badge variant="secondary" className="ml-2">
              {mockNotifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <Badge variant="secondary" className="ml-2">
              {unreadNotifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {unreadNotifications.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Unread</h2>
              {unreadNotifications.map((notification) => (
                <Card key={notification.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className={cn(
                      "rounded-full p-2",
                      notification.read ? "bg-secondary" : "bg-primary/10"
                    )}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">
                          {notification.type}
                        </Badge>
                        <span className={cn(
                          "text-xs",
                          getPriorityColor(notification.priority)
                        )}>
                          {notification.priority}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {readNotifications.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Earlier</h2>
              {readNotifications.map((notification) => (
                <Card key={notification.id} className="hover:shadow-md transition-shadow opacity-70">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="rounded-full p-2 bg-secondary">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">
                          {notification.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {unreadNotifications.map((notification) => (
            <Card key={notification.id} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="rounded-full p-2 bg-primary/10">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">
                      {notification.type}
                    </Badge>
                    <span className={cn(
                      "text-xs",
                      getPriorityColor(notification.priority)
                    )}>
                      {notification.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {new Date(notification.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Job Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about new job matches
                  </p>
                </div>
                <Switch
                  checked={emailNotifications.jobAlerts}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, jobAlerts: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Application Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get updates about your job applications
                  </p>
                </div>
                <Switch
                  checked={emailNotifications.applicationUpdates}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, applicationUpdates: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for new messages
                  </p>
                </div>
                <Switch
                  checked={emailNotifications.messages}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, messages: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Push Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Jobs</Label>
                  <p className="text-sm text-muted-foreground">
                    Get instant alerts for new job postings
                  </p>
                </div>
                <Switch
                  checked={pushNotifications.newJobs}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, newJobs: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Application Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Real-time updates on your applications
                  </p>
                </div>
                <Switch
                  checked={pushNotifications.applicationStatus}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, applicationStatus: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Important updates about the platform
                  </p>
                </div>
                <Switch
                  checked={pushNotifications.systemUpdates}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, systemUpdates: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}