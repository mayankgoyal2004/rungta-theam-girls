import React from 'react';
import { 
  CircleDot, 
  Sparkles, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  UserX, 
  Ban, 
  FileBadge, 
  Shirt, 
  Gavel 
} from 'lucide-react';

export default function RulesSection() {
  const col1Rules = [
    {
      id: "01",
      icon: <CircleDot className="w-5 h-5 text-[#061b38] shrink-0" strokeWidth={2.4} />,
      text: "This tournament will be played with a tennis ball."
    },
    {
      id: "02",
      icon: <Sparkles className="w-5 h-5 text-[#061b38] shrink-0" strokeWidth={2.4} />,
      text: "Each inning will start with a new ball."
    },
    {
      id: "03",
      icon: <Trophy className="w-5 h-5 text-[#061b38] shrink-0" strokeWidth={2.4} />,
      text: "Knockout prelims matches will be of 5 overs."
    },
    {
      id: "04",
      icon: <Clock className="w-5 h-5 text-[#061b38] shrink-0" strokeWidth={2.4} />,
      text: "Semi Final and Final matches will be of 6 overs a side. Teams should report 30 minutes prior to scheduled match start time."
    },
    {
      id: "05",
      icon: <CheckCircle2 className="w-5 h-5 text-[#061b38] shrink-0" strokeWidth={2.4} />,
      text: "On-field umpire's decision would be the final one."
    },
    {
      id: "06",
      icon: <ShieldAlert className="w-5 h-5 text-[#061b38] shrink-0" strokeWidth={2.4} />,
      text: "LBW and Leg byes are not applicable for this tournament."
    }
  ];

  const col2Rules = [
    {
      id: "07",
      icon: <UserX className="w-5 h-5 text-[#061b38] shrink-0" strokeWidth={2.4} />,
      text: "A player who has played in one team is not allowed to play in another team."
    },
    {
      id: "08",
      icon: <Ban className="w-5 h-5 text-[#061b38] shrink-0" strokeWidth={2.4} />,
      text: "Chucking is strictly not allowed."
    },
    {
      id: "09",
      icon: <FileBadge className="w-5 h-5 text-[#061b38] shrink-0" strokeWidth={2.4} />,
      text: "All players must produce original School ID card and Aadhaar card at the time of registration/verification."
    },
    {
      id: "10",
      icon: <Shirt className="w-5 h-5 text-[#061b38] shrink-0" strokeWidth={2.4} />,
      text: "All participants are required to wear team sports uniforms and the necessary sports gear throughout the event."
    },
    {
      id: "11",
      icon: <Gavel className="w-5 h-5 text-[#061b38] shrink-0" strokeWidth={2.4} />,
      text: "The organizer has full right to change the match rules according to the situation."
    }
  ];

  return (
    <section className="section rules-section" id="rules">
      <div className="container-custom">
        
        {/* SECTION HEADING */}
        <div className="section-heading center">
          <h2 className="prizes-main-title">
            RULES & <span>REGULATIONS</span>
          </h2>
          <p className="prizes-subtitle">
            FAIR PLAY & OFFICIAL TOURNAMENT GUIDELINES
          </p>
        </div>

        {/* 2-COLUMN RULES CONTAINER */}
        <div className="rules-two-cols">
          
          {/* COLUMN 1 (01 TO 06) */}
          <div className="rules-col">
            {col1Rules.map((rule) => (
              <div className="rule-item-card" key={rule.id}>
                <div className="rule-num-box">
                  {rule.id}
                </div>
                <div className="rule-body">
                  <div className="rule-icon-box">
                    {rule.icon}
                  </div>
                  <p className="rule-text">
                    {rule.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* COLUMN 2 (07 TO 11) */}
          <div className="rules-col">
            {col2Rules.map((rule) => (
              <div className="rule-item-card" key={rule.id}>
                <div className="rule-num-box">
                  {rule.id}
                </div>
                <div className="rule-body">
                  <div className="rule-icon-box">
                    {rule.icon}
                  </div>
                  <p className="rule-text">
                    {rule.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
