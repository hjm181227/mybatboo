"use strict";(self.webpackChunkmybatboo=self.webpackChunkmybatboo||[]).push([[8249],{8249:(N,h,l)=>{l.r(h),l.d(h,{InquiryManagementComponent:()=>F});var f=l(974),B=l(2704),g=l(1135),C=l(3900),d=l(8505),p=l(5649),y=l(5554),r=l(6921),v=l(50),O=l(9282),x=l(9300),m=l(9401),n=l(2223),_=l(8615),Z=l(7204),M=l(8740),c=l(4755);function P(e,i){1&e&&(n.TgZ(0,"div",16),n._UZ(1,"mp-icon",17),n.TgZ(2,"span"),n._uU(3,"\uc9c4\ub2e8\uae30\ub85d\uc744 \ubd88\ub7ec\uc624\ub294\uc911\uc785\ub2c8\ub2e4"),n.qZA()())}function b(e,i){if(1&e&&(n.TgZ(0,"span"),n._uU(1),n.qZA()),2&e){const t=n.oxw(2).ngIf;n.xp6(1),n.hij("\uc678 ",(null==t.diagnosisRecord?null:t.diagnosisRecord.diagnosisResults.length)-1," \uac1c")}}function I(e,i){if(1&e&&(n.TgZ(0,"div",18),n._UZ(1,"img",19),n.TgZ(2,"div",20)(3,"div",21),n._UZ(4,"crop-type-badge",22),n.TgZ(5,"span"),n._uU(6),n.ALo(7,"date"),n.qZA()(),n.TgZ(8,"div",21),n._uU(9),n.ALo(10,"diseaseName"),n.YNc(11,b,2,1,"span",0),n.qZA()()()),2&e){const t=n.oxw().ngIf;n.xp6(1),n.Q6J("src",null==t.diagnosisRecord?null:t.diagnosisRecord.imagePath,n.LSH)("alt","\uc791\ubb3c \uc774\ubbf8\uc9c0"),n.xp6(3),n.Q6J("cropType",null==t.diagnosisRecord?null:t.diagnosisRecord.cropType),n.xp6(2),n.Oqu(n.xi3(7,7,null==t.diagnosisRecord?null:t.diagnosisRecord.regDate,"yyyy.MM.dd HH:mm")),n.xp6(3),n.AsE(" \ubcd1\ud574: ",n.lcZ(10,10,null==t.diagnosisRecord||null==t.diagnosisRecord.diagnosisResults[0]?null:t.diagnosisRecord.diagnosisResults[0].diseaseCode)," (",(100*(null==t.diagnosisRecord?null:t.diagnosisRecord.diagnosisResults[0].accuracy)).toFixed(2),"%) "),n.xp6(2),n.Q6J("ngIf",(null==t.diagnosisRecord?null:t.diagnosisRecord.diagnosisResults.length)>1)}}function q(e,i){if(1&e&&(n.TgZ(0,"span",23),n._uU(1),n.ALo(2,"date"),n.qZA()),2&e){const t=n.oxw().ngIf;n.xp6(1),n.Oqu(n.xi3(2,1,null==t.reply?null:t.reply.regDate,"yyyy.MM.dd HH:mm"))}}function T(e,i){if(1&e){const t=n.EpF();n.ynx(0),n.TgZ(1,"mp-icon-button",1),n.NdJ("click",function(){n.CHM(t);const s=n.oxw();return n.KtG(s.close())}),n.qZA(),n.TgZ(2,"div",2)(3,"div",3),n._uU(4),n.TgZ(5,"span"),n._uU(6),n.ALo(7,"date"),n.qZA()(),n.TgZ(8,"div",4),n._uU(9),n.qZA()(),n.TgZ(10,"div",5),n._uU(11," \uc9c4\ub2e8 \uae30\ub85d "),n.TgZ(12,"mp-helper-text",6),n._UZ(13,"mp-icon",7),n.qZA()(),n.YNc(14,P,4,0,"div",8),n.YNc(15,I,12,12,"div",9),n.TgZ(16,"div",10),n._uU(17," \uc804\ubb38\uac00 \ub2f5\ubcc0 "),n.YNc(18,q,3,4,"span",11),n.qZA(),n.TgZ(19,"div",12),n._UZ(20,"mp-textarea",13),n.TgZ(21,"mp-button",14),n.NdJ("click",function(){const u=n.CHM(t).ngIf,a=n.oxw();return n.KtG((null==u.inquiry?null:u.inquiry.replyId)>-1?a.updateReply(u.inquiry.replyId):a.submitReply())}),n._UZ(22,"mp-icon",15),n.qZA()(),n.BQk()}if(2&e){const t=i.ngIf,o=n.oxw();n.xp6(4),n.hij(" ",null==t.inquiry?null:t.inquiry.title," "),n.xp6(2),n.Oqu(n.xi3(7,11,null==t.inquiry?null:t.inquiry.regDate,"yyyy.MM.dd HH:mm")),n.xp6(3),n.hij(" ",null==t.inquiry?null:t.inquiry.contents," "),n.xp6(5),n.Q6J("ngIf",t.diagnosisRecordStatus.pending),n.xp6(1),n.Q6J("ngIf",t.diagnosisRecord),n.xp6(3),n.Q6J("ngIf",t.reply),n.xp6(2),n.Q6J("formControl",o.replyContent)("placeholder","\ub2f5\ubcc0\uc744 \uc791\uc131\ud574\uc8fc\uc138\uc694"),n.xp6(1),n.Q6J("loading",t.replyStatus.pending)("disabled",(null==t.reply?null:t.reply.contents)===o.replyContent.value||o.replyContent.invalid)("label",(null==t.inquiry?null:t.inquiry.replyId)>-1?"\ub2f5\ubcc0 \uc218\uc815":"\ub2f5\ubcc0 \ub4f1\ub85d")}}const w=function(e,i,t,o,s,u){return{inquiry:e,status:i,diagnosisRecord:t,diagnosisRecordStatus:o,reply:s,replyStatus:u}};let A=(()=>{class e{constructor(t,o,s,u){this.api=t,this.alert=o,this.toast=s,this.modalRef=u,this.status$=new g.X(p.Lr.INITIAL),this.inquiry$=(0,p.X5)(this,"inquiryId").pipe((0,x.h)(a=>!!a),(0,C.w)(a=>this.api.loadInquiryDetail(a).pipe((0,p.vC)(this.status$)))),this.diagnosisStatus$=new g.X(p.Lr.INITIAL),this.diagnosisRecord$=this.inquiry$.pipe((0,x.h)(a=>!!a&&!!a.diagnosisRecordId),(0,C.w)(({diagnosisRecordId:a})=>this.api.getDiagnosisResult(a).pipe((0,p.vC)(this.diagnosisStatus$)))),this.replyStatus$=new g.X(p.Lr.INITIAL),this.replyContent=new m.NI("",[m.kI.required]),this.reply$=this.inquiry$.pipe((0,x.h)(a=>!!a&&a.replyId>-1),(0,C.w)(({replyId:a})=>this.api.loadInquiryReply(a).pipe((0,p.vC)(this.replyStatus$),(0,d.b)(({contents:H})=>this.replyContent.patchValue(H)))))}submitReply(){this.api.replyToInquiry(this.inquiryId,this.replyContent.value).pipe((0,p.vC)(this.replyStatus$),(0,d.b)(()=>this.toast.show("\ub2f5\ubcc0\uc774 \ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4.")),(0,d.b)(()=>this.close())).subscribe()}updateReply(t){this.api.editReplyContent(t,this.replyContent.value).pipe((0,p.vC)(this.replyStatus$),(0,d.b)(()=>this.toast.show("\ub2f5\ubcc0\uc774 \uc218\uc815\ub418\uc5c8\uc2b5\ub2c8\ub2e4.")),(0,d.b)(()=>this.close())).subscribe()}close(){this.modalRef.hide()}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(_.s),n.Y36(r.c9),n.Y36(Z.k),n.Y36(M.UZ))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-reply-edit-modal"]],inputs:{inquiryId:"inquiryId"},standalone:!0,features:[n.jDz],decls:7,vars:20,consts:[[4,"ngIf"],["left","","size","m","iconName","close","color","grayDark","variant","void",3,"click"],[1,"inquiry-info"],[1,"title"],[1,"content"],[1,"record-label"],["label","\uc774\ubbf8\uc9c0 \ud074\ub9ad\uc2dc \ud655\ub300\ud558\uc5ec \ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4."],["type","outlined"],["class","record-placeholder",4,"ngIf"],["class","selected-record",4,"ngIf"],[1,"reply-label"],["class","date",4,"ngIf"],[1,"reply-container"],["autofocus","true","height","300px","padding","14px","backgroundColor","white","boxShadow","0px 2px 4px 0px rgba(20, 20, 20, 0.02), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)",3,"formControl","placeholder"],["size","m","variant","fill",3,"loading","disabled","label","click"],["right","","name","send"],[1,"record-placeholder"],["name","clock_loader_60","type","outlined","size","36px","color","grayLight"],[1,"selected-record"],[3,"src","alt"],[1,"info"],[1,"line"],[3,"cropType"],[1,"date"]],template:function(t,o){1&t&&(n.YNc(0,T,23,14,"ng-container",0),n.ALo(1,"async"),n.ALo(2,"async"),n.ALo(3,"async"),n.ALo(4,"async"),n.ALo(5,"async"),n.ALo(6,"async")),2&t&&n.Q6J("ngIf",n.HTZ(13,w,n.lcZ(1,1,o.inquiry$),n.lcZ(2,3,o.status$),n.lcZ(3,5,o.diagnosisRecord$),n.lcZ(4,7,o.diagnosisStatus$),n.lcZ(5,9,o.reply$),n.lcZ(6,11,o.replyStatus$)))},dependencies:[f.B,c.O5,m.JJ,m.oH,r.zJ,r.KT,r.gL,r.l4,r.k_,r.vS,c.Ov,c.uU,v.Y,O.A,r.Ly],styles:['@charset "UTF-8";[_nghost-%COMP%]{padding:24px}[_nghost-%COMP%]   .record-label[_ngcontent-%COMP%]{font-size:13px;color:var(--gray);font-weight:500;padding:0 0 8px 4px;display:flex;align-items:center;justify-content:space-between}[_nghost-%COMP%]   .record-placeholder[_ngcontent-%COMP%]{display:flex;align-items:center;gap:24px;width:100%;padding:12px;height:104px;box-shadow:0 9px 24px #14141414,0 0 0 1px #1414140f;border-radius:8px;margin-bottom:24px;font-size:16px;color:var(--redLight);font-weight:500}[_nghost-%COMP%]   .selected-record[_ngcontent-%COMP%]{display:flex;gap:16px;padding:12px;width:100%;box-shadow:0 6px 16px #14141414,0 0 0 1px #1414140f;border-radius:8px;margin-bottom:24px}[_nghost-%COMP%]   .selected-record[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px;height:80px}[_nghost-%COMP%]   .selected-record[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;gap:8px;width:100%;padding:8px 0}[_nghost-%COMP%]   .selected-record[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}[_nghost-%COMP%]   .inquiry-info[_ngcontent-%COMP%]{padding:24px 0}[_nghost-%COMP%]   .inquiry-info[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{font-size:16px;color:var(--grayDark);font-weight:600;padding:0 0 12px 4px}[_nghost-%COMP%]   .inquiry-info[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;font-size:18px;color:var(--grayDarker);font-weight:600;padding:0 0 12px 4px}[_nghost-%COMP%]   .inquiry-info[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:13px;color:var(--gray);font-weight:500;justify-self:flex-end}[_nghost-%COMP%]   .inquiry-info[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{font-size:14px;color:var(--grayDark);font-weight:500;padding:4px}[_nghost-%COMP%]   .reply-label[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:24px 0 12px 4px;font-size:16px;color:var(--grayDark);font-weight:600}[_nghost-%COMP%]   .reply-label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:13px;color:var(--gray);font-weight:500;justify-self:flex-end}[_nghost-%COMP%]   .reply-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px;margin-bottom:24px}[_nghost-%COMP%]   .reply-container[_ngcontent-%COMP%]   .reply-content[_ngcontent-%COMP%]{font-size:14px;color:var(--grayDark);font-weight:500;white-space:pre-wrap}']}),e})();var R=l(6814);function D(e,i){if(1&e){const t=n.EpF();n.TgZ(0,"mp-row",13),n.NdJ("click",function(){const u=n.CHM(t).$implicit,a=n.oxw(2);return n.KtG(a.openInquiryDetail(u.id))}),n.TgZ(1,"mp-col"),n._uU(2),n.qZA(),n.TgZ(3,"mp-col"),n._uU(4),n.qZA(),n.TgZ(5,"mp-col"),n._uU(6),n.ALo(7,"date"),n.qZA(),n.TgZ(8,"mp-col",14),n._UZ(9,"mp-icon",15),n.qZA()()}if(2&e){const t=i.$implicit;n.xp6(2),n.Oqu(t.id),n.xp6(2),n.Oqu(t.title),n.xp6(2),n.Oqu(n.xi3(7,4,t.regDate,"yyyy.MM.dd HH:mm")),n.xp6(3),n.Q6J("name",t.replyId>-1?"circle":"close")}}function L(e,i){1&e&&n._UZ(0,"mp-blank",16)}function U(e,i){1&e&&n._UZ(0,"mp-blank",17)}const E=function(){return[]};function $(e,i){if(1&e&&(n.TgZ(0,"div",1)(1,"div",2),n._uU(2),n.qZA(),n.TgZ(3,"div",3)(4,"mp-table",4),n.ALo(5,"async"),n.TgZ(6,"mp-row",5)(7,"mp-col",6),n._uU(8,"\ubb38\uc758 ID"),n.qZA(),n.TgZ(9,"mp-col",7),n._uU(10,"\uc81c\ubaa9"),n.qZA(),n.TgZ(11,"mp-col",8),n._uU(12,"\uc791\uc131\uc77c"),n.qZA(),n.TgZ(13,"mp-col",9),n._uU(14,"\ub2f5\ubcc0"),n.qZA()(),n.YNc(15,D,10,7,"mp-row",10),n.YNc(16,L,1,0,"mp-blank",11),n.YNc(17,U,1,0,"mp-blank",12),n.ALo(18,"async"),n.qZA()()()),2&e){const t=i.ngIf,o=n.oxw();let s;n.xp6(2),n.hij(" \uc9c4\ub2e8 \ubb38\uc758 \ubaa9\ub85d (",(null==t.inquiryList?null:t.inquiryList.length)||0,") "),n.xp6(2),n.Q6J("listNum",10)("bodyColor","white")("status",n.lcZ(5,8,o.status$)),n.xp6(5),n.Q6J("flex",1),n.xp6(6),n.Q6J("ngForOf",t.inquiryList||n.DdM(12,E)),n.xp6(1),n.Q6J("ngIf",0===(null==t.inquiryList?null:t.inquiryList.length)),n.xp6(1),n.Q6J("ngIf",null==(s=n.lcZ(18,10,o.status$))?null:s.pending)}}const J=function(e,i){return{currentUser:e,inquiryList:i}};let F=(()=>{class e{constructor(t,o,s){this.api=t,this.store=o,this.modalService=s,this.currentUser$=this.store.select(B.HF),this.status$=new g.X(p.Lr.INITIAL),this.loader$=new g.X(null),this.inquiryList$=this.loader$.pipe((0,C.w)(()=>this.api.loadInquiryList().pipe((0,p.vC)(this.status$),(0,d.b)(console.log))))}openInquiryDetail(t){this.modalService.show(A,{initialState:{inquiryId:t},onClose:()=>this.loader$.next(null)})}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(_.s),n.Y36(R.yh),n.Y36(M.tT))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-inquiry-management"]],standalone:!0,features:[n.jDz],decls:3,vars:8,consts:[["class","global-container",4,"ngIf"],[1,"global-container"],[1,"title-label"],[1,"content-section"],["colGap","8px","rowGap","0px","rowPadding","16px 12px","bodyPadding","0","bodyHeight","529px",3,"listNum","bodyColor","status"],["head",""],["width","60px"],["align","left",3,"flex"],["width","150px","align","left"],["width","60px","align","center"],[3,"click",4,"ngFor","ngForOf"],["minHeight","529px","title","\uc804\ubb38\uac00 \ubb38\uc758 \ub0b4\uc5ed\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.",4,"ngIf"],["minHeight","529px","title","\ubb38\uc758 \ub0b4\uc5ed\uc744 \ubd88\ub7ec\uc624\ub294\uc911\uc785\ub2c8\ub2e4.",4,"ngIf"],[3,"click"],["align","center"],["type","outlined","size","20px","color","grayDark",3,"name"],["minHeight","529px","title","\uc804\ubb38\uac00 \ubb38\uc758 \ub0b4\uc5ed\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."],["minHeight","529px","title","\ubb38\uc758 \ub0b4\uc5ed\uc744 \ubd88\ub7ec\uc624\ub294\uc911\uc785\ub2c8\ub2e4."]],template:function(t,o){1&t&&(n.YNc(0,$,19,13,"div",0),n.ALo(1,"async"),n.ALo(2,"async")),2&t&&n.Q6J("ngIf",n.WLB(5,J,n.lcZ(1,1,o.currentUser$),n.lcZ(2,3,o.inquiryList$)))},dependencies:[f.B,c.sg,c.O5,r.zJ,c.Ov,c.uU,y.gH,y.Xh,y.wb,y.ST,r.DJ],styles:['@charset "UTF-8";[_nghost-%COMP%]{display:flex;flex-direction:column}[_nghost-%COMP%]   .title-label[_ngcontent-%COMP%]{display:flex;align-items:center;padding:36px 0 24px 8px;font-size:18px;color:var(--grayDark);font-weight:600}[_nghost-%COMP%]   .title-label[_ngcontent-%COMP%]   mp-button[_ngcontent-%COMP%]{margin-left:auto}[_nghost-%COMP%]   mp-table[_ngcontent-%COMP%]{display:block;overflow:hidden;border-radius:10px;box-shadow:0 2px 4px #14141405,0 0 0 1px #00000014}[_nghost-%COMP%]   mp-table[_ngcontent-%COMP%]   mp-row[head][_ngcontent-%COMP%]{font-size:15px;color:var(--grayDark);font-weight:500;background-color:#f5f5f5;box-shadow:inset 0 -1px #0000000a,inset 0 1px #0000000a}[_nghost-%COMP%]   mp-table[_ngcontent-%COMP%]   mp-row[_ngcontent-%COMP%]:not(.head)   mp-col[_ngcontent-%COMP%]{font-size:14px;color:var(--grayDark);font-weight:400}[_nghost-%COMP%]   mp-table[_ngcontent-%COMP%]   mp-row[_ngcontent-%COMP%]:not(.head) + mp-row[_ngcontent-%COMP%]:not(.head){border-top:1px solid var(--grayLightest)}']}),e})()}}]);