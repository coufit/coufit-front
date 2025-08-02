import { User, Lock } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "./ui/dialog";

interface LoginModalProps {
  loginModalOpen: boolean;
  setloginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
import { Button } from "./ui/button";
export default function LoginModal({
  loginModalOpen,
  setloginModalOpen,
}: LoginModalProps) {
  return (
    <Dialog open={loginModalOpen} onOpenChange={setloginModalOpen}>
      <DialogContent className="max-w-md z-[100]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            로그인
          </DialogTitle>
          <DialogDescription className="sr-only">
            로그인 모달입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="flex flex-row gap-2 text-sm font-medium text-gray-700 mb-2 ">
                <User className="h-4 w-4" />
                아이디
              </label>
              <input className="w-full" placeholder="아이디를 입력하세요" />
            </div>
            <div>
              <label className="flex flex-row gap-2 text-sm font-medium text-gray-700 mb-2 ">
                <Lock className="h-4 w-4" />
                비밀번호
              </label>
              <input
                className="w-full"
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 items-center justify-center">
            로그인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
