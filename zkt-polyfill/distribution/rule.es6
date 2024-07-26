module.exports = {
  // 优先保障卖货人，逻辑为进入场景为员工，优先员工，否则消费者，最次为当前人
  suppliersFirst: ['cid', 'mid', 'memberId'],
  // 优先保障消费者，其余员工，当前人最次
  consumersFirst: ['mid', 'cid', 'memberId'],
  // 当前人优先
  oneselfFirst: ['memberId']
}