---
title: 'Database System Term Project'
date: '2024-04-11'
---

완전히 비정규화(unnormalization)된 대규모 데이터 청크(116,350개의 행, 42개의 열, 약 2.45GB)를 제공받아 개체-관계 모델(Entity-Relationship Model, ERM), 정규화(normalization), 역정규화(denormalization), 인덱스(index)를 사용하여 용량 및 시간적인 면에서 좋은 데이터베이스 스키마를 설계하는 프로젝트입니다.

![Term Project](https://github.com/sehyeongcho/database-system-term-project/assets/124948262/01cf5e8a-e507-4f50-90bb-56672ae54493)

## 프로젝트 목표
- 이 프로젝트에서는, KUBiC 프로젝트 팀으로부터 제공받은 완전히 비정규화된 대규모 데이터 청크를 관리하기 위한 좋은 데이터베이스 스키마를 설계해야 합니다. (좋다는 것은 용량 및 시간 면에서 효율적임을 의미합니다.)
  - <a href="https://kubic.handong.edu/" target="_blank">KUBiC (Korean Unification Bigdata Center)</a>
- 이 프로젝트는 2개의 단계가 있습니다.
  - Phase 1: 용량 면에서 효율적인 데이터베이스 스키마를 설계해야 합니다. 대규모 데이터 청크를 분석하고 정규화를 사용하여 데이터의 중복을 줄여야 합니다. (용량이 가장 작은 팀이 최고 점수를 받게 됩니다.)
  - Phase 2: 시간 면에서 효율적인 데이터베이스 스키마를 설계해야 합니다. 정규화를 너무 많이 하면 원하는 데이터를 검색할 때마다 조인을 하게 되는데, 조인은 비싼 자원이라 남용하면 프로그램의 수행 시간이 길어지게 됩니다. 이를 개선하기 위해 데이터의 중복을 감수하고 의도적으로 합치는 역정규화를 사용해야 합니다. 그리고 검색 시간을 줄여줄 수 있는 자료 구조인 인덱스를 사용해야 합니다. (검색 속도가 가장 빠르면서 용량이 적게 증가한 팀이 최고 점수를 받게 됩니다.)

## 사용 기술
- MySQL

## 프로젝트 진행
### Phase 1
용량 면에서 효율적인 데이터베이스 스키마를 설계하기 위해 정규화를 사용했습니다. 데이터를 정규화하기 위해 다음과 같은 과정을 진행했습니다.

1. 각 열의 역할을 분석합니다.
2. 정규형(normal form)을 사용하여 제공된 데이터를 분해하고 관련이 있는 열끼리 묶어 여러 개체 집합(entity set)을 구성합니다.
3. 개체-관계 다이어그램(Entity-Relationship Diagram, ERD)을 사용하여 여러 개체 집합 간에 여러 관계 집합(relationship set)을 구성합니다.
4. 개체 집합을 관계형 스키마로 표현합니다.
5. 각 테이블을 분석하고 정규형을 사용하여 데이터 중복을 줄입니다.
6. 각 열의 적절한 데이터 유형을 설정합니다.

### Phase 2
시간 면에서 효율적인 데이터베이스 스키마를 설계하기 위해 역정규화 및 인덱스를 사용했습니다. 진행한 과정은 다음과 같습니다.

1. 데이터를 역정규화하기 위해 2가지 방법을 사용합니다.
   - 조인을 줄이는 방법: 자주 조회하는 데이터가 조인을 통해 조회되는 데이터인 경우, 필요한 열을 테이블에 합쳐 조인을 줄입니다.
   - 연산을 줄이는 방법: 자주 조회하는 데이터가 연산을 통해 조회되는 데이터인 경우, 연산 결과 열을 테이블에 따로 추가하여 연산을 줄입니다.
2. 역정규화를 수행한 테이블에 인덱스를 생성합니다.

## 후기
데이터 청크를 관리하기 위한 좋은 데이터베이스 스키마를 설계하기 위해 용량 및 시간 면에서 접근했습니다.

용량을 줄이기 위해 정규화를 진행하는 과정에서, 각 테이블이 의미를 잃지 않는 선에서 중복을 최대한 제거하기 위해 계속해서 개체-관계 다이어그램을 그렸습니다. 중복을 모두 제거하는 것이 용량 면에서는 최고의 선택일 수 있지만, 이 과정에서 의미를 잃는 테이블이 발생할 수 있기 때문입니다. 그리고 쓰기 성능을 높이고자 정규화를 과도하게 진행하게 되면, 데이터를 조회할 때마다 조인을 남용하게 되어 읽기 성능의 저하를 초래할 수 있습니다.

시간을 줄이기 위해 역정규화를 진행하는 과정에서, 읽기 성능과 쓰기 성능을 절충하기 위한 타협점에 대해 생각해 볼 수 있었습니다. 읽기 성능을 높이고자 역정규화를 과도하게 진행하게 되면, 처음에 제공받은 데이터 청크와 크게 다르지 않은 데이터베이스가 될 것이기 때문입니다. 그리고 타협점을 찾은 후에는 인덱스를 생성하여 읽기 성능을 향상했습니다.

이 프로젝트를 통해 이론으로만 배워 추상적이었던 개체-관계 다이어그램, 정규화, 역정규화, 인덱스를 직접 사용해 보면서 구체적으로 이해할 수 있었습니다.
