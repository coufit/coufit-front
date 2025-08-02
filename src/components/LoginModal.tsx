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
import { useState } from "react";
export default function LoginModal({
  loginModalOpen,
  setloginModalOpen,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("아이디와 비밀번호 모두 입력해주세요");
      alert("아이디와 비밀번호 모두 입력해주세요");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "1234",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("로그인 성공", data);
        alert("로그인 성공");
        setloginModalOpen(false);
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      setError("네트워크 에러");
    }
  };

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
              <input
                className="w-full"
                placeholder="아이디를 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-emerald-600 hover:bg-emerald-700 items-center justify-center"
          >
            로그인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
